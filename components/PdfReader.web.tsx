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
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js"></script>
  <style>
    body { margin: 0; background: #525659; overflow-y: auto; }
    #container { display: flex; flex-direction: column; align-items: center; padding: 10px 0; }
    .page-container { position: relative; margin-bottom: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); background: white; }
    .pdf-canvas { display: block; }
    .layer { position: absolute; top: 0; left: 0; pointer-events: none; }
    #highlight-layer { z-index: 5; }
    .draw-layer { z-index: 10; pointer-events: none; }
    .draw-layer.active { pointer-events: auto; }
  </style>
</head>
<body>
  <div id="container"></div>

  <script>
    const url = '${pdfUrl || ''}'; 
    let pdfDoc = null;
    let searchMatches = [];
    let currentMatchIndex = -1;
    let currentSearchQuery = '';
    
    // Draw Config
    let isDrawing = false;
    let drawingEnabled = false;
    let drawColor = '#FF0000';
    let lastX = 0;
    let lastY = 0;

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
    
    function createPageElements(pageNum, viewport) {
        const container = document.getElementById('container');
        
        const pageDiv = document.createElement('div');
        pageDiv.className = 'page-container';
        pageDiv.id = 'page-' + pageNum;
        
        const canvas = document.createElement('canvas');
        canvas.className = 'pdf-canvas';
        
        const highlightLayer = document.createElement('canvas');
        highlightLayer.className = 'layer';
        highlightLayer.id = 'highlight-' + pageNum;
        
        const drawLayer = document.createElement('canvas');
        drawLayer.className = 'layer draw-layer';
        drawLayer.id = 'draw-' + pageNum;
        
        // Setup Drawing Events
        setupDrawingEvents(drawLayer);

        pageDiv.appendChild(canvas);
        pageDiv.appendChild(highlightLayer);
        pageDiv.appendChild(drawLayer);
        container.appendChild(pageDiv);
        
        return { canvas, highlightLayer, drawLayer, pageDiv };
    }

    async function renderPage(num) {
      try {
          const page = await pdfDoc.getPage(num);
          const pixelRatio = window.devicePixelRatio || 1;
          
          // Calculate scale to fit container (max 800px or full width)
          const availableWidth = Math.min(window.innerWidth * 0.95, 800);
          const unscaledViewport = page.getViewport({scale: 1.0});
          const scale = (availableWidth / unscaledViewport.width) * pixelRatio;
          const viewport = page.getViewport({scale: scale});

          const { canvas, highlightLayer, drawLayer, pageDiv } = createPageElements(num, viewport);
          
          // Set visual size
          const cssWidth = (viewport.width / pixelRatio) + 'px';
          const cssHeight = (viewport.height / pixelRatio) + 'px';
          
          pageDiv.style.width = cssWidth;
          pageDiv.style.height = cssHeight;
          
          [canvas, highlightLayer, drawLayer].forEach(c => {
             c.width = viewport.width;
             c.height = viewport.height;
             c.style.width = '100%';
             c.style.height = '100%';
          });

          const ctx = canvas.getContext('2d');
          const renderContext = {
            canvasContext: ctx,
            viewport: viewport
          };
          
          await page.render(renderContext).promise;
          return true;
      } catch(e) {
          console.error(e);
      }
    }
    
    async function renderAllPages() {
        // Clear container
        document.getElementById('container').innerHTML = '';
        
        for(let i=1; i<=pdfDoc.numPages; i++) {
            await renderPage(i);
        }
        sendMessage({ type: 'loaded', total: pdfDoc.numPages });
    }

    if (url) {
        pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
          pdfDoc = pdfDoc_;
          renderAllPages();
        });
    }
    
    // --- Draw Logic ---
    function setupDrawingEvents(canvas) {
        const ctx = canvas.getContext('2d');
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 3;
        
        const getPos = (e) => {
            const rect = canvas.getBoundingClientRect();
            // Scale coords since canvas is high-res
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            return {
                x: (clientX - rect.left) * scaleX,
                y: (clientY - rect.top) * scaleY
            };
        };
        
        const start = (e) => {
            if(!drawingEnabled) return;
            isDrawing = true;
            const pos = getPos(e);
            lastX = pos.x;
            lastY = pos.y;
            ctx.strokeStyle = drawColor;
            if(e.type === 'touchstart') e.preventDefault();
        };
        
        const move = (e) => {
            if(!isDrawing || !drawingEnabled) return;
            const pos = getPos(e);
            
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            
            lastX = pos.x;
            lastY = pos.y;
             if(e.type === 'touchmove') e.preventDefault();
        };

        const end = () => isDrawing = false;
        
        canvas.addEventListener('mousedown', start);
        canvas.addEventListener('touchstart', start, {passive: false});
        canvas.addEventListener('mousemove', move);
        canvas.addEventListener('touchmove', move, {passive: false});
        canvas.addEventListener('mouseup', end);
        canvas.addEventListener('touchend', end);
    }
    
    function setDrawingMode(enabled, color) {
        drawingEnabled = enabled;
        if(color) drawColor = color;
        const layers = document.getElementsByClassName('draw-layer');
        for(let l of layers) l.style.pointerEvents = enabled ? 'auto' : 'none';
        document.body.style.overflowY = enabled ? 'hidden' : 'auto'; // Disable scroll when drawing
    }
    
    // --- Search ---
    async function performSearch(query) {
       currentSearchQuery = query;
       if (!query || query.length < 3) {
           sendSearchStatus();
           return;
       }
       
       searchMatches = [];
       currentMatchIndex = -1;
       
        // Clear previous highlights
       const highlights = document.getElementsByClassName('layer');
       for(let h of highlights) {
           if(h.id.startsWith('highlight-')) {
               const ctx = h.getContext('2d');
               ctx.clearRect(0,0, h.width, h.height);
           }
       }
       
       sendMessage({ type: 'search_start' });

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

    async function showMatch(match) {
        const pageDiv = document.getElementById('page-' + match.pageNum);
       if (pageDiv) {
           pageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
           
           const highlightCanvas = document.getElementById('highlight-' + match.pageNum);
           const ctx = highlightCanvas.getContext('2d');
           
           const page = await pdfDoc.getPage(match.pageNum);
           const pixelRatio = window.devicePixelRatio || 1;
           const containerWidth = Math.min(window.innerWidth * 0.95, 800);
           const unscaledViewport = page.getViewport({scale: 1.0});
           const scale = (containerWidth / unscaledViewport.width) * pixelRatio;
           const viewport = page.getViewport({scale: scale});
           
           drawHighlight(ctx, match.item, viewport);
       }
    }

    function drawHighlight(ctx, item, viewport) {
       ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
       
       const content = item.str;
       if (!content || !currentSearchQuery) return; 
       
       const matchIndex = content.toLowerCase().indexOf(currentSearchQuery.toLowerCase());
       if (matchIndex === -1) return;

       const charWidth = item.width / content.length;
       const startOffset = matchIndex * charWidth;
       const matchWidth = currentSearchQuery.length * charWidth;

       const x = item.transform[4] + startOffset;
       const y = item.transform[5];
       const w = matchWidth; 
       const h = item.transform[3] || 12;
       
       const rect = viewport.convertToViewportRectangle([x, y, x + w, y + h]);
       const minX = Math.min(rect[0], rect[2]);
       const minY = Math.min(rect[1], rect[3]);
       const width = Math.abs(rect[2] - rect[0]);
       const height = Math.abs(rect[3] - rect[1]);

       ctx.fillStyle = 'rgba(255, 223, 0, 0.5)';
       ctx.fillRect(minX, minY, width, height);
    }

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
    outlineStyle: 'none' } as any,
  actionButtonSmall: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 18, borderWidth: 1, borderColor: 'transparent' },
  colorPalette: { flexDirection: 'row', gap: 12 },
  colorDot: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#fff' },
  colorDotSelected: { borderColor: '#333', transform: [{scale: 1.2}] },
  webviewContainer: { flex: 1, position: 'relative', backgroundColor: '#525659' },
  loader: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  floatingNav: { position: 'absolute', bottom: 30,  alignSelf: 'center', flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 20 },
  navBtn: { padding: 10 }
});
