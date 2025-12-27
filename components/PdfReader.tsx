import { useTheme } from '@/contexts/ThemeContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as FileSystem from 'expo-file-system';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface PdfReaderProps {
  uri: string;
  title?: string;
  id?: number;
}

export default function PdfReader({ uri, title, id }: PdfReaderProps) {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const webViewRef = useRef<WebView>(null);

  // Estados
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSearch, setShowSearch] = useState(false);
  const [showDrawTools, setShowDrawTools] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [drawColor, setDrawColor] = useState('#FF0000');
  const [pdfData, setPdfData] = useState<string | null>(null);
  
  // Search State
  const [totalMatches, setTotalMatches] = useState(0);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  useEffect(() => {
    const loadPdf = async () => {
      // ... (existing code omitted for brevity, keeping it same)
      if (!uri) return;
      if (uri.startsWith('file://')) {
        try {
          const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
          setPdfData(`data:application/pdf;base64,${base64}`);
        } catch (e) {
            setPdfData(uri);
        }
      } else {
         setPdfData(uri);
      }
    };
    loadPdf();
  }, [uri]);

  // Construcción del HTML visor
  const viewerHtml = React.useMemo(() => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=3">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js"></script>
  <style>
    body { margin: 0; background: #525659; overflow: auto; -webkit-touch-callout: none; }
    #container { position: relative; width: 100%; min-height: 100vh; }
    #pdf-render { width: 100%; display: block; }
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
    <canvas id="pdf-render"></canvas>
    <canvas id="highlight-layer"></canvas>
    <canvas id="canvas-layer"></canvas>
  </div>

  <script>
    const url = '${pdfData || ''}'; 
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
    let pendingHighlight = null; // { pageNum, item }
    
    // Config
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
        const viewport = page.getViewport({scale: scale});
        const containerWidth = document.body.clientWidth;
        const newScale = (containerWidth / page.getViewport({scale: 1.0}).width);
        const scaledViewport = page.getViewport({scale: newScale});
        currentViewport = scaledViewport;

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
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'page_changed', page: num }));
          
          if (pageNumPending !== null) {
            renderPage(pageNumPending);
            pageNumPending = null;
          } else if (pendingHighlight && pendingHighlight.pageNum === num) {
             drawHighlight(pendingHighlight.item);
             pendingHighlight = null;
          } else if (currentMatchIndex >= 0 && searchMatches[currentMatchIndex].pageNum === num) {
             // Redraw current match if on same page
             drawHighlight(searchMatches[currentMatchIndex].item);
          }
        });
      });
      
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'meta', page: num, total: pdfDoc.numPages }));
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

    pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
      pdfDoc = pdfDoc_;
      renderPage(pageNum);
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'loaded', total: pdfDoc.numPages }));
    });

    // --- Búsqueda ---
    async function performSearch(query) {
       if (!query || query.length < 3) return;
       
       searchMatches = [];
       currentMatchIndex = -1;
       window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'search_start', query: query }));

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
        window.ReactNativeWebView.postMessage(JSON.stringify({ 
            type: 'search_result', 
            count: searchMatches.length, 
            index: currentMatchIndex + 1 // 1-based for UI
        }));
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
       const h = item.transform[3] || 12; // Height
       
       const rect = currentViewport.convertToViewportRectangle([x, y, x + item.width, y + h]);
       const minX = Math.min(rect[0], rect[2]);
       const minY = Math.min(rect[1], rect[3]);
       const width = Math.abs(rect[2] - rect[0]);
       const height = Math.abs(rect[3] - rect[1]);

       highlightCtx.fillStyle = 'rgba(255, 255, 0, 0.4)';
       highlightCtx.fillRect(minX, minY - height, width, height * 1.5);
    }
    
    // --- Lógica de Dibujo ---
    function setDrawingMode(enabled, color) {
        drawingEnabled = enabled;
        drawCanvas.style.pointerEvents = enabled ? 'auto' : 'none';
        if(color) drawCtx.strokeStyle = color;
    }

    drawCanvas.addEventListener('touchstart', (e) => {
        if (!drawingEnabled) return;
        isDrawing = true;
        const rect = drawCanvas.getBoundingClientRect();
        lastX = e.touches[0].clientX - rect.left;
        lastY = e.touches[0].clientY - rect.top;
        e.preventDefault(); 
    }, {passive: false});

    drawCanvas.addEventListener('touchmove', (e) => {
        if (!isDrawing || !drawingEnabled) return;
        const rect = drawCanvas.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;
        
        drawCtx.beginPath();
        drawCtx.moveTo(lastX, lastY);
        drawCtx.lineTo(x, y);
        drawCtx.stroke();
        
        lastX = x;
        lastY = y;
        e.preventDefault();
    }, {passive: false});

    drawCanvas.addEventListener('touchend', () => isDrawing = false);
    
    // Handle Messages
    window.addEventListener('message', (event) => {}); // RN handles injects directly but good practice
    
    window.performSearch = performSearch;
    window.nextMatch = nextMatch;
    window.prevMatch = prevMatch;
  </script>
</body>
</html>
  `, [pdfData]);
  
  // Scripts para inyectar acciones
  const injectDrawToggle = (enabled: boolean, color: string) => {
    return `setDrawingMode(${enabled}, '${color}'); true;`;
  };

  const injectSearch = (query: string) => {
    return `window.performSearch('${query}'); true;`; 
  };
  
  const injectSearchNav = (dir: 'next' | 'prev') => {
      return dir === 'next' ? 'window.nextMatch(); true;' : 'window.prevMatch(); true;';
  };
  
  const injectPageNav = (dir: 'next' | 'prev') => {
      return dir === 'next' ? 'onNextPage();' : 'onPrevPage();';
  };

  useEffect(() => {
    if (webViewRef.current) {
        webViewRef.current.injectJavaScript(injectDrawToggle(showDrawTools, drawColor));
    }
  }, [showDrawTools, drawColor]);

  const handleMessage = (event: any) => {
    try {
        const data = JSON.parse(event.nativeEvent.data);
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
    } catch (e) {
        console.log('Error parsing WebView message', e);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.backgroundSecondary, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={20} color={colors.text} />
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
           <Text style={[styles.headerTitle, { color: colors.text }]} numberOfLines={1}>{title || 'Manual'}</Text>
           <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
             Página {currentPage} de {totalPages || '-'}
           </Text>
        </View>
        
        <View style={styles.headerTools}>
           <TouchableOpacity
             onPress={() => { setShowSearch(!showSearch); setShowDrawTools(false); }}
             style={[styles.toolButton, showSearch && { backgroundColor: isDark ? '#333' : '#eee' }]}
           >
             <FontAwesome name="search" size={18} color={colors.text} />
           </TouchableOpacity>

           <TouchableOpacity
             onPress={() => { setShowDrawTools(!showDrawTools); setShowSearch(false); }}
             style={[styles.toolButton, showDrawTools && { backgroundColor: isDark ? '#333' : '#eee' }]}
           >
             <FontAwesome name="pencil" size={18} color={colors.text} />
           </TouchableOpacity>
        </View>
      </View>

      {/* Tools: Búsqueda */}
      {showSearch && (
        <View style={[styles.toolbar, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
           <TextInput 
              style={[styles.searchInput, { color: colors.text, backgroundColor: colors.background }]}
              placeholder="Buscar..."
              placeholderTextColor={colors.textSecondary || '#999'}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={() => webViewRef.current?.injectJavaScript(injectSearch(searchQuery))}
           />
           {totalMatches > 0 && (
               <Text style={{fontSize: 12, color: colors.textSecondary, marginRight: 8}}>
                   {currentMatchIndex}/{totalMatches}
               </Text>
           )}
           <TouchableOpacity style={styles.actionButtonSmall} onPress={() => webViewRef.current?.injectJavaScript(injectSearchNav('prev'))}>
               <FontAwesome name="chevron-up" size={14} color={colors.text} />
           </TouchableOpacity>
           <View style={{width:8}} />
           <TouchableOpacity style={styles.actionButtonSmall} onPress={() => webViewRef.current?.injectJavaScript(injectSearchNav('next'))}>
               <FontAwesome name="chevron-down" size={14} color={colors.text} />
           </TouchableOpacity>
           <View style={{width:8}} />
           <TouchableOpacity style={[styles.actionButtonSmall, {backgroundColor: colors.primary}]} onPress={() => webViewRef.current?.injectJavaScript(injectSearch(searchQuery))}>
               <FontAwesome name="search" size={14} color="#000" />
           </TouchableOpacity>
        </View>
      )}

      {/* Tools: Dibujo */}
      {showDrawTools && (
        <View style={[styles.toolbar, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
           <View style={styles.colorPalette}>
              {['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#000000'].map(c => (
                 <TouchableOpacity 
                    key={c} 
                    style={[styles.colorDot, { backgroundColor: c }, drawColor === c && styles.colorDotSelected]} 
                    onPress={() => setDrawColor(c)}
                 />
              ))}
           </View>
        </View>
      )}

      {/* WebView PDF Viewer */}
      <View style={styles.webviewContainer}>
          {pdfData ? (
             <WebView
               ref={webViewRef}
               originWhitelist={['*']}
               source={{ html: viewerHtml }}
               onMessage={handleMessage}
               javaScriptEnabled={true}
               domStorageEnabled={true}
               allowFileAccess={true}
               allowUniversalAccessFromFileURLs={true}
               style={{ flex: 1, backgroundColor: '#525659' }}
             />
          ) : (
             <View style={{flex: 1, backgroundColor: '#525659'}} />
          )}
          
          {/* Navegación flotante simple para demo */}
          <View style={styles.floatingNav}>
              <TouchableOpacity onPress={() => webViewRef.current?.injectJavaScript(injectPageNav('prev'))} style={styles.navBtn}>
                 <FontAwesome name="chevron-left" size={24} color="#fff" />
              </TouchableOpacity>
              <View style={{width: 20}} />
              <TouchableOpacity onPress={() => webViewRef.current?.injectJavaScript(injectPageNav('next'))} style={styles.navBtn}>
                 <FontAwesome name="chevron-right" size={24} color="#fff" />
              </TouchableOpacity>
          </View>

          {loading && (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={{color: '#fff', marginTop: 10}}>Cargando PDF...</Text>
            </View>
          )}
      </View>
      
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 60,
    marginTop: 40,
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
  searchInput: { flex: 1, height: 36, borderRadius: 8, paddingHorizontal: 12, marginRight: 10, fontSize: 14 },
  actionButtonSmall: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 18, borderWidth: 1, borderColor: 'transparent' },
  colorPalette: { flexDirection: 'row', gap: 12 },
  colorDot: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#fff' },
  colorDotSelected: { borderColor: '#333', transform: [{scale: 1.2}] },
  webviewContainer: { flex: 1, position: 'relative' },
  loader: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center', justifyContent: 'center' },
  floatingNav: { position: 'absolute', bottom: 30,  alignSelf: 'center', flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 20 },
  navBtn: { padding: 10 }
});
