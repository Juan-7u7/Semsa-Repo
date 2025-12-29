import { useTheme } from '@/contexts/ThemeContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as FileSystem from 'expo-file-system/legacy';
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
  const [isReady, setIsReady] = useState(false);
  
  // Search State
  const [totalMatches, setTotalMatches] = useState(0);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  useEffect(() => {
    const loadPdf = async () => {
      if (!uri) return;
      // console.log('Loading PDF URI:', uri);
      if (uri.startsWith('file://')) {
        try {
          // Use legacy or standard import
          const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
          setPdfData(`data:application/pdf;base64,${base64}`);
        } catch (e) {
            console.error('Error reading file:', e);
            setPdfData(uri);
        }
      } else {
         setPdfData(uri);
      }
    };
    loadPdf();
  }, [uri]);

   // Send PDF data when ready
   useEffect(() => {
    if (pdfData && isReady && webViewRef.current) {
        // console.log('Sending PDF data to WebView');
        webViewRef.current.postMessage(JSON.stringify({ type: 'init_pdf', data: pdfData }));
    }
  }, [pdfData, isReady]);

  // Construcción del HTML visor
  const viewerHtml = React.useMemo(() => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=3">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js"></script>
  <style>
    body { margin: 0; background: #525659; overflow-y: auto; -webkit-touch-callout: none; }
    #container { display: flex; flex-direction: column; align-items: center; padding: 10px 0; }
    .page-container { position: relative; margin-bottom: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.3); background: white; }
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
    let pdfDoc = null;
    let scale = 1.5;
    let searchMatches = [];
    let currentMatchIndex = -1;
    
    // Config Drawing
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
        pageDiv.style.width = viewport.width + 'px';
        pageDiv.style.height = viewport.height + 'px';
        
        const canvas = document.createElement('canvas');
        canvas.className = 'pdf-canvas';
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        const highlightLayer = document.createElement('canvas');
        highlightLayer.className = 'layer';
        highlightLayer.id = 'highlight-' + pageNum;
        highlightLayer.width = viewport.width;
        highlightLayer.height = viewport.height;
        
        const drawLayer = document.createElement('canvas');
        drawLayer.className = 'layer draw-layer';
        drawLayer.id = 'draw-' + pageNum;
        drawLayer.width = viewport.width;
        drawLayer.height = viewport.height;
        
        // Setup Drawing Events for this layer
        setupDrawingEvents(drawLayer);

        pageDiv.appendChild(canvas);
        pageDiv.appendChild(highlightLayer);
        pageDiv.appendChild(drawLayer);
        container.appendChild(pageDiv);
        
        return { canvas, highlightLayer, drawLayer };
    }

    async function renderPage(num) {
      try {
          const page = await pdfDoc.getPage(num);
          
          // Calculate scale to fit screen width
          const containerWidth = window.innerWidth - 20; // -20 padding
          const unscaledViewport = page.getViewport({scale: 1.0});
          const newScale = containerWidth / unscaledViewport.width;
          const viewport = page.getViewport({scale: newScale});

          const { canvas, highlightLayer, drawLayer } = createPageElements(num, viewport);
          
          const ctx = canvas.getContext('2d');
          const renderContext = {
            canvasContext: ctx,
            viewport: viewport
          };
          
          await page.render(renderContext).promise;
          return true;
      } catch(e) {
          console.error(e);
          return false;
      }
    }

    async function renderAllPages() {
        if (!pdfDoc) return;
        document.getElementById('container').innerHTML = ''; // Clear
        
        for (let i = 1; i <= pdfDoc.numPages; i++) {
            await renderPage(i);
            // Notify progress periodically or at end?
        }
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'loaded', total: pdfDoc.numPages }));
    }

    // --- Drawing Logic ---
    function setupDrawingEvents(canvas) {
        const ctx = canvas.getContext('2d');
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 3;
        
        canvas.addEventListener('touchstart', (e) => {
            if (!drawingEnabled) return;
            isDrawing = true;
            const rect = canvas.getBoundingClientRect();
            lastX = e.touches[0].clientX - rect.left;
            lastY = e.touches[0].clientY - rect.top;
            ctx.strokeStyle = drawColor;
            e.preventDefault(); 
        }, {passive: false});

        canvas.addEventListener('touchmove', (e) => {
            if (!isDrawing || !drawingEnabled) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            const y = e.touches[0].clientY - rect.top;
            
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.stroke();
            
            lastX = x;
            lastY = y;
            e.preventDefault();
        }, {passive: false});

        canvas.addEventListener('touchend', () => isDrawing = false);
    }
    
    function setDrawingMode(enabled, color) {
        drawingEnabled = enabled;
        if(color) drawColor = color;
        
        const layers = document.getElementsByClassName('draw-layer');
        for(let layer of layers) {
             layer.style.pointerEvents = enabled ? 'auto' : 'none';
        }
    }

    // --- Search Logic ---
    async function performSearch(query) {
       if (!query || query.length < 3) return;
       
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
       
       window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'search_start' }));

       // Search in all pages
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
          // Alert native?
       }
       
       sendSearchStatus();
    }

    async function showMatch(match) {
       // Find page container and scroll to it
       const pageDiv = document.getElementById('page-' + match.pageNum);
       if (pageDiv) {
           pageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
           
           // Draw highlight
           const highlightCanvas = document.getElementById('highlight-' + match.pageNum);
           const ctx = highlightCanvas.getContext('2d');
           // Need viewport for this page
           const page = await pdfDoc.getPage(match.pageNum);
           // Recalculate scale (same as render logic)
           const containerWidth = window.innerWidth - 20;
           const unscaledViewport = page.getViewport({scale: 1.0});
           const newScale = containerWidth / unscaledViewport.width;
           const viewport = page.getViewport({scale: newScale});
           
           drawHighlightOnCanvas(ctx, match.item, viewport);
       }
    }

    function drawHighlightOnCanvas(ctx, item, viewport) {
       // Clear specific highlight if needed, but we might want multiple. 
       // For now clear all on this page to be simple or keep adding? 
       // Let's clear for "current match" mode, but maybe we want "find all" visual? 
       // Requirements said "next/prev", so focus mode is best.
       ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);

       const x = item.transform[4];
       const y = item.transform[5];
       const w = item.width * (item.transform[0] || 1);
       const h = item.transform[3] || 12; 
       
       const rect = viewport.convertToViewportRectangle([x, y, x + item.width, y + h]);
       const minX = Math.min(rect[0], rect[2]);
       const minY = Math.min(rect[1], rect[3]);
       const width = Math.abs(rect[2] - rect[0]);
       const height = Math.abs(rect[3] - rect[1]);

       ctx.fillStyle = 'rgba(255, 255, 0, 0.4)';
       ctx.fillRect(minX, minY - height, width, height * 1.5);
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
            index: currentMatchIndex + 1 
        }));
    }

    // --- Message Handling ---
    // Handle Android Message
    document.addEventListener('message', handleMessage);
    // Handle iOS Message
    window.addEventListener('message', handleMessage);
    
    function handleMessage(event) {
        try {
            const msg = JSON.parse(event.data);
            if (msg.type === 'init_pdf') {
                pdfjsLib.getDocument(msg.data).promise.then(function(doc) {
                    pdfDoc = doc;
                    renderAllPages();
                });
            } else if (msg.type === 'search_start') {
                performSearch(msg.query);
            } // ... matches nav handling by existing window functions
        } catch(e) {}
    }
    
    window.performSearch = performSearch;
    window.nextMatch = nextMatch;
    window.prevMatch = prevMatch;
    window.setDrawingMode = setDrawingMode;
    
    // Notify Ready
    setTimeout(function() {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'ready' }));
    }, 500);
  </script>
</body>
</html>
  `, []);

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
        } else if (data.type === 'ready') {
            setIsReady(true);
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
