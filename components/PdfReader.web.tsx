import { useTheme } from '@/contexts/ThemeContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface PdfReaderProps {
  uri: string;
  title?: string;
  id?: number;
}

export default function PdfReaderWeb({ uri, title, id }: PdfReaderProps) {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Estados
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSearch, setShowSearch] = useState(false);
  const [showDrawTools, setShowDrawTools] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [drawColor, setDrawColor] = useState('#FF0000');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  
  // Search State
  const [totalMatches, setTotalMatches] = useState(0);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  useEffect(() => {
    if (uri) {
        // En web, si es ruta relativa y usamos srcDoc, necesitamos la URL completa
        if (typeof window !== 'undefined' && uri.startsWith('/')) {
             setPdfUrl(`${window.location.origin}${uri}`);
        } else {
             setPdfUrl(uri);
        }
    }
  }, [uri]);

  // Construcción del HTML visor (Adaptado para Web Iframe)
  const viewerHtml = React.useMemo(() => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=3">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js"></script>
  <style>
    body { margin: 0; background: #525659; overflow: auto; }
    #container { position: relative; width: 100%; min-height: 100vh; display: flex; justify-content: center; }
    #wrapper { position: relative; }
    #pdf-render { display: block; }
    #highlight-layer, #canvas-layer { 
      position: absolute; 
      top: 0; left: 0; 
      pointer-events: none;
    }
    #highlight-layer { z-index: 5; }
    #canvas-layer { z-index: 10; }
  </style>
</head>
<body>
  <div id="container">
    <div id="wrapper">
      <canvas id="pdf-render"></canvas>
      <canvas id="highlight-layer"></canvas>
      <canvas id="canvas-layer"></canvas>
    </div>
  </div>

  <script>
    const url = '${pdfUrl || ''}'; 
    let pdfDoc = null;
    let pageNum = 1;
    let pageRendering = false;
    let pageNumPending = null;
    let scale = 1.5;
    
    // Canvases
    const canvas = document.getElementById('pdf-render');
    const ctx = canvas.getContext('2d');
    const highlightCanvas = document.getElementById('highlight-layer');
    const highlightCtx = highlightCanvas.getContext('2d');
    const drawCanvas = document.getElementById('canvas-layer');
    const drawCtx = drawCanvas.getContext('2d');
    
    // State
    let currentViewport = null;
    let searchMatches = [];
    let currentMatchIndex = -1;
    let pendingHighlight = null;
    
    // Draw Config
    let isDrawing = false;
    let drawingEnabled = false;
    let lastX = 0;
    let lastY = 0;
    drawCtx.lineJoin = 'round';
    drawCtx.lineCap = 'round';
    drawCtx.lineWidth = 3;
    drawCtx.strokeStyle = '#FF0000';

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

    function renderPage(num) {
      pageRendering = true;
      pdfDoc.getPage(num).then(function(page) {
        const desiredWidth = Math.min(window.innerWidth * 0.95, 800);
        const viewport = page.getViewport({scale: 1.0});
        const newScale = desiredWidth / viewport.width;
        const scaledViewport = page.getViewport({scale: newScale});
        currentViewport = scaledViewport;

        // Resize all
        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;
        highlightCanvas.height = scaledViewport.height;
        highlightCanvas.width = scaledViewport.width;
        drawCanvas.height = scaledViewport.height;
        drawCanvas.width = scaledViewport.width;
        
        highlightCtx.clearRect(0, 0, highlightCanvas.width, highlightCanvas.height);

        const renderContext = {
          canvasContext: ctx,
          viewport: scaledViewport
        };
        const renderTask = page.render(renderContext);

        renderTask.promise.then(function() {
          pageRendering = false;
          sendMessage({ type: 'page_changed', page: num });
          if (pageNumPending !== null) {
            renderPage(pageNumPending);
            pageNumPending = null;
          } else if (pendingHighlight && pendingHighlight.pageNum === num) {
             drawHighlight(pendingHighlight.item);
             pendingHighlight = null;
          } else if (currentMatchIndex >= 0 && searchMatches[currentMatchIndex].pageNum === num) {
             drawHighlight(searchMatches[currentMatchIndex].item);
          }
        });
      });
      sendMessage({ type: 'meta', page: num, total: pdfDoc.numPages });
    }

    function queueRenderPage(num) {
      if (pageRendering) {
        pageNumPending = num;
      } else {
        renderPage(num);
      }
    }

    function onPrevPage() {
      if (pageNum <= 1) return;
      pageNum--;
      queueRenderPage(pageNum);
    }

    function onNextPage() {
      if (pageNum >= pdfDoc.numPages) return;
      pageNum++;
      queueRenderPage(pageNum);
    }

    if (url) {
        pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
          pdfDoc = pdfDoc_;
          renderPage(pageNum);
          sendMessage({ type: 'loaded', total: pdfDoc.numPages });
        });
    }
    
    // --- Search ---
    async function performSearch(query) {
       if (!query || query.length < 3) return;
       
       searchMatches = [];
       currentMatchIndex = -1;
       
       for (let i = 1; i <= pdfDoc.numPages; i++) {
          try {
             const page = await pdfDoc.getPage(i);
             const textContent = await page.getTextContent();
             textContent.items.forEach(item => {
                if (item.str && item.str.toLowerCase().includes(query.toLowerCase())) {
                   searchMatches.push({ pageNum: i, item: item });
                }
             });
          } catch(e) {}
       }
       
       if (searchMatches.length > 0) {
          currentMatchIndex = 0;
          showMatch(searchMatches[0]);
       } else {
          alert('No se encontraron coincidencias');
       }
       
       sendSearchStatus();
    }
    
    function nextMatch() {
        if (searchMatches.length === 0) return;
        currentMatchIndex = (currentMatchIndex + 1) % searchMatches.length;
        showMatch(searchMatches[currentMatchIndex]);
        sendSearchStatus();
    }

    function prevMatch() {
        if (searchMatches.length === 0) return;
        currentMatchIndex = (currentMatchIndex - 1 + searchMatches.length) % searchMatches.length;
        showMatch(searchMatches[currentMatchIndex]);
        sendSearchStatus();
    }
    
    function sendSearchStatus() {
        sendMessage({ 
            type: 'search_result', 
            count: searchMatches.length, 
            index: currentMatchIndex + 1 
        });
    }

    function showMatch(match) {
       if (pageNum !== match.pageNum) {
          pageNum = match.pageNum;
          pendingHighlight = match;
          renderPage(pageNum);
       } else {
          drawHighlight(match.item);
       }
    }

    function drawHighlight(item) {
       if (!currentViewport) return;
       highlightCtx.clearRect(0, 0, highlightCanvas.width, highlightCanvas.height);
       
       const x = item.transform[4];
       const y = item.transform[5];
       const w = item.width * (item.transform[0] || 1); 
       const h = item.transform[3] || 12;
       
       const rect = currentViewport.convertToViewportRectangle([x, y, x + item.width, y + h]);
       const minX = Math.min(rect[0], rect[2]);
       const minY = Math.min(rect[1], rect[3]);
       const width = Math.abs(rect[2] - rect[0]);
       const height = Math.abs(rect[3] - rect[1]);

       highlightCtx.fillStyle = 'rgba(255, 255, 0, 0.4)';
       highlightCtx.fillRect(minX, minY - height, width, height * 1.5);
    }

    // --- Dibujo ---
    function setDrawingMode(enabled, color) {
        drawingEnabled = enabled;
        drawCanvas.style.pointerEvents = enabled ? 'auto' : 'none';
        if(color) drawCtx.strokeStyle = color;
    }

    function startDraw(e) {
        if (!drawingEnabled) return;
        isDrawing = true;
        const rect = drawCanvas.getBoundingClientRect();
        // Soporte Touch y Mouse
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        lastX = clientX - rect.left;
        lastY = clientY - rect.top;
    }

    function moveDraw(e) {
        if (!isDrawing || !drawingEnabled) return;
        const rect = drawCanvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        
        drawCtx.beginPath();
        drawCtx.moveTo(lastX, lastY);
        drawCtx.lineTo(x, y);
        drawCtx.stroke();
        
        lastX = x;
        lastY = y;
    }
    
    function endDraw() { isDrawing = false; }

    drawCanvas.addEventListener('mousedown', startDraw);
    drawCanvas.addEventListener('touchstart', startDraw, {passive: false});

    drawCanvas.addEventListener('mousemove', moveDraw);
    drawCanvas.addEventListener('touchmove', (e) => { e.preventDefault(); moveDraw(e); }, {passive: false});

    drawCanvas.addEventListener('mouseup', endDraw);
    drawCanvas.addEventListener('touchend', endDraw);
    drawCanvas.addEventListener('mouseout', endDraw);

    // --- Comunicación ---
    function sendMessage(data) {
        window.parent.postMessage(JSON.stringify(data), '*');
    }

    window.addEventListener('message', (event) => {
        try {
            const msg = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
            if (msg.type === 'toggle_draw') {
                setDrawingMode(msg.enabled, msg.color);
            } else if (msg.type === 'search') {
                performSearch(msg.query);
            } else if (msg.type === 'search_next') {
                nextMatch();
            } else if (msg.type === 'search_prev') {
                prevMatch();
            } else if (msg.type === 'nav') {
                if (msg.dir === 'next') onNextPage();
                else if (msg.dir === 'prev') onPrevPage();
            }
        } catch(e) {}
    });
  </script>
</body>
</html>
  `, [pdfUrl]);

  // Comunicación con Iframe
  const sendMessageToIframe = (msg: any) => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
          iframeRef.current.contentWindow.postMessage(JSON.stringify(msg), '*');
      }
  };

  useEffect(() => {
    sendMessageToIframe({ type: 'toggle_draw', enabled: showDrawTools, color: drawColor });
  }, [showDrawTools, drawColor]);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
        try {
            const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
            if (data.type === 'loaded') {
                setLoading(false);
                setTotalPages(data.total);
            } else if (data.type === 'page_changed') {
                setCurrentPage(data.page);
            } else if (data.type === 'meta') {
                setTotalPages(data.total);
                setCurrentPage(data.page);
            } else if (data.type === 'search_result') {
                setTotalMatches(data.count);
                setCurrentMatchIndex(data.index);
            }
        } catch (e) {}
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <View style={styles.container as any}>
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.backgroundSecondary, borderBottomColor: colors.border }] as any}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton as any}>
          <FontAwesome name="arrow-left" size={20} color={colors.text} />
        </TouchableOpacity>
        
        <View style={styles.headerInfo as any}>
           <Text style={[styles.headerTitle, { color: colors.text }] as any} numberOfLines={1}>{title || 'Manual'}</Text>
           <Text style={[styles.headerSubtitle, { color: colors.textSecondary }] as any}>
             Página {currentPage} de {totalPages || '-'}
           </Text>
        </View>
        
        <View style={styles.headerTools as any}>
           <TouchableOpacity
             onPress={() => { setShowSearch(!showSearch); setShowDrawTools(false); }}
             style={[styles.toolButton, showSearch && { backgroundColor: isDark ? '#333' : '#eee' }] as any}
           >
             <FontAwesome name="search" size={18} color={colors.text} />
           </TouchableOpacity>

           <TouchableOpacity
             onPress={() => { setShowDrawTools(!showDrawTools); setShowSearch(false); }}
             style={[styles.toolButton, showDrawTools && { backgroundColor: isDark ? '#333' : '#eee' }] as any}
           >
             <FontAwesome name="pencil" size={18} color={colors.text} />
           </TouchableOpacity>
        </View>
      </View>

      {/* Tools: Búsqueda */}
      {showSearch && (
        <View style={[styles.toolbar, { backgroundColor: colors.card, borderBottomColor: colors.border }] as any}>
           <TextInput 
              style={[styles.searchInput, { color: colors.text, backgroundColor: colors.background }] as any}
              placeholder="Buscar..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={() => sendMessageToIframe({ type: 'search', query: searchQuery })}
           />
           {totalMatches > 0 && (
               <Text style={{fontSize: 12, color: colors.textSecondary, marginRight: 8}}>
                   {currentMatchIndex}/{totalMatches}
               </Text>
           )}
           <TouchableOpacity style={styles.actionButtonSmall as any} onPress={() => sendMessageToIframe({ type: 'search_prev' })}>
               <FontAwesome name="chevron-up" size={14} color={colors.text} />
           </TouchableOpacity>
           <View style={{width:8}} />
           <TouchableOpacity style={styles.actionButtonSmall as any} onPress={() => sendMessageToIframe({ type: 'search_next' })}>
               <FontAwesome name="chevron-down" size={14} color={colors.text} />
           </TouchableOpacity>
           <View style={{width:8}} />
           <TouchableOpacity style={[styles.actionButtonSmall as any, {backgroundColor: colors.primary}]} onPress={() => sendMessageToIframe({ type: 'search', query: searchQuery })}>
              <FontAwesome name="search" size={14} color="#000" />
           </TouchableOpacity>
        </View>
      )}

      {/* Tools: Dibujo */}
      {showDrawTools && (
        <View style={[styles.toolbar, { backgroundColor: colors.card, borderBottomColor: colors.border }] as any}>
           <View style={styles.colorPalette as any}>
              {['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#000000'].map(c => (
                 <TouchableOpacity 
                    key={c} 
                    style={[styles.colorDot, { backgroundColor: c }, drawColor === c && styles.colorDotSelected] as any} 
                    onPress={() => setDrawColor(c)}
                 />
              ))}
           </View>
        </View>
      )}

      {/* Iframe View */}
      <View style={styles.webviewContainer as any}>
        {pdfUrl ? (
          <iframe
            ref={iframeRef}
            srcDoc={viewerHtml}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            title="PDF Viewer"
          />
        ) : (
            <View style={styles.loader as any}>
             <Text style={{color: colors.text}}>Preparando documento...</Text>
            </View>
        )}

          {/* Navegación flotante simple para demo */}
          <View style={styles.floatingNav as any}>
              <TouchableOpacity onPress={() => sendMessageToIframe({ type: 'nav', dir: 'prev' })} style={styles.navBtn as any}>
                 <FontAwesome name="chevron-left" size={24} color="#fff" />
              </TouchableOpacity>
              <View style={{width: 20}} />
              <TouchableOpacity onPress={() => sendMessageToIframe({ type: 'nav', dir: 'next' })} style={styles.navBtn as any}>
                 <FontAwesome name="chevron-right" size={24} color="#fff" />
              </TouchableOpacity>
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, height: '100%' },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    zIndex: 10,
  },
  backButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20 },
  headerInfo: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 14, fontWeight: '600', textAlign: 'center' },
  headerSubtitle: { fontSize: 11, marginTop: 2, textAlign: 'center' },
  headerTools: { flexDirection: 'row', alignItems: 'center' },
  toolButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginLeft: 4 },
  toolbar: { height: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, borderBottomWidth: 1, justifyContent: 'space-between' },
  searchInput: { flex: 1, height: 36, borderRadius: 8, paddingHorizontal: 12, marginRight: 10, fontSize: 14, 
    // @ts-ignore
    outlineStyle: 'none' },
  actionButtonSmall: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 18, borderWidth: 1, borderColor: 'transparent' },
  colorPalette: { flexDirection: 'row', gap: 12 },
  colorDot: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#fff' },
  colorDotSelected: { borderColor: '#333', transform: [{scale: 1.2}] },
  webviewContainer: { flex: 1, position: 'relative', backgroundColor: '#525659' },
  loader: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  floatingNav: { position: 'absolute', bottom: 30,  alignSelf: 'center', flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 20 },
  navBtn: { padding: 10 }
});
