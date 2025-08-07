1:"$Sreact.fragment"
2:I[7555,[],""]
3:I[1295,[],""]
4:I[9243,["177","static/chunks/app/layout-82b1c767173d3366.js"],""]
8:I[8393,[],""]
:HL["/_next/static/media/e4af272ccee01ff0-s.p.woff2","font",{"crossOrigin":"","type":"font/woff2"}]
:HL["/_next/static/css/815e277498ebf634.css","style"]
5:T7a6,
              // Initialize performance optimizations
              if (typeof window !== 'undefined') {
                // Monitor Core Web Vitals
                if ('PerformanceObserver' in window) {
                  // LCP
                  new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log('LCP:', lastEntry.startTime);
                  }).observe({ entryTypes: ['largest-contentful-paint'] });

                  // FID
                  new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    entries.forEach(entry => {
                      console.log('FID:', entry.processingStart - entry.startTime);
                    });
                  }).observe({ entryTypes: ['first-input'] });

                  // CLS
                  new PerformanceObserver((entryList) => {
                    let clsValue = 0;
                    const entries = entryList.getEntries();
                    entries.forEach(entry => {
                      if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                      }
                    });
                    console.log('CLS:', clsValue);
                  }).observe({ entryTypes: ['layout-shift'] });
                }

                // Track page load time
                window.addEventListener('load', () => {
                  const loadTime = performance.now();
                  console.log('Page load time:', loadTime);
                });

                // Initialize Elfsight when script loads
                window.addEventListener('load', () => {
                  if (typeof window !== 'undefined' && window.elfsight) {
                    window.elfsight.init();
                  }
                });
              }
            0:{"P":null,"b":"ppjbvKnuKSYMVqDgCt6-m","p":"","c":["",""],"i":false,"f":[[["",{"children":["__PAGE__",{}]},"$undefined","$undefined",true],["",["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/815e277498ebf634.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}]],["$","html",null,{"lang":"en","children":[["$","head",null,{"children":[["$","link",null,{"rel":"preload","href":"/images/Vineyards/Copia di colline.jpg","as":"image"}],["$","link",null,{"rel":"preload","href":"/images/Logos/Valdo Logo New.png","as":"image"}],["$","link",null,{"rel":"preload","href":"/images/Bottle Shots/Marca Oro Prosecco DOC Brut USA.png","as":"image"}],["$","link",null,{"rel":"dns-prefetch","href":"//static.elfsight.com"}],["$","link",null,{"rel":"dns-prefetch","href":"//www.instagram.com"}],["$","link",null,{"rel":"dns-prefetch","href":"//fonts.googleapis.com"}],["$","link",null,{"rel":"dns-prefetch","href":"//fonts.gstatic.com"}],["$","link",null,{"rel":"preconnect","href":"https://static.elfsight.com","crossOrigin":"anonymous"}],["$","link",null,{"rel":"preconnect","href":"https://www.instagram.com","crossOrigin":"anonymous"}],["$","link",null,{"rel":"preconnect","href":"https://fonts.googleapis.com","crossOrigin":"anonymous"}],["$","link",null,{"rel":"preconnect","href":"https://fonts.gstatic.com","crossOrigin":"anonymous"}]]}],["$","body",null,{"className":"__variable_7d24f9","children":[["$","$L2",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L3",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],[]],"forbidden":"$undefined","unauthorized":"$undefined"}],["$","$L4",null,{"src":"https://static.elfsight.com/platform/platform.js","strategy":"lazyOnload"}],["$","$L4",null,{"id":"performance-monitoring","strategy":"afterInteractive","dangerouslySetInnerHTML":{"__html":"$5"}}]]}]]}]]}],{"children":["__PAGE__","$L6",{},null,false]},null,false],"$L7",false]],"m":"$undefined","G":["$8",[]],"s":false,"S":true}
9:I[2580,["567","static/chunks/567-a721b0fe483a718a.js","159","static/chunks/159-e42e4353683915ca.js","580","static/chunks/580-5a1f7b8bdc214514.js","974","static/chunks/app/page-d817606edc199b72.js"],"default"]
a:I[6132,["567","static/chunks/567-a721b0fe483a718a.js","159","static/chunks/159-e42e4353683915ca.js","580","static/chunks/580-5a1f7b8bdc214514.js","974","static/chunks/app/page-d817606edc199b72.js"],"default"]
b:I[3775,["567","static/chunks/567-a721b0fe483a718a.js","159","static/chunks/159-e42e4353683915ca.js","580","static/chunks/580-5a1f7b8bdc214514.js","974","static/chunks/app/page-d817606edc199b72.js"],"default"]
c:I[8223,["567","static/chunks/567-a721b0fe483a718a.js","159","static/chunks/159-e42e4353683915ca.js","580","static/chunks/580-5a1f7b8bdc214514.js","974","static/chunks/app/page-d817606edc199b72.js"],"default"]
d:I[8804,["567","static/chunks/567-a721b0fe483a718a.js","159","static/chunks/159-e42e4353683915ca.js","580","static/chunks/580-5a1f7b8bdc214514.js","974","static/chunks/app/page-d817606edc199b72.js"],"default"]
e:I[3247,["567","static/chunks/567-a721b0fe483a718a.js","159","static/chunks/159-e42e4353683915ca.js","580","static/chunks/580-5a1f7b8bdc214514.js","974","static/chunks/app/page-d817606edc199b72.js"],"default"]
f:I[3161,["567","static/chunks/567-a721b0fe483a718a.js","159","static/chunks/159-e42e4353683915ca.js","580","static/chunks/580-5a1f7b8bdc214514.js","974","static/chunks/app/page-d817606edc199b72.js"],"default"]
10:I[2044,["567","static/chunks/567-a721b0fe483a718a.js","159","static/chunks/159-e42e4353683915ca.js","580","static/chunks/580-5a1f7b8bdc214514.js","974","static/chunks/app/page-d817606edc199b72.js"],"default"]
11:I[3513,["567","static/chunks/567-a721b0fe483a718a.js","159","static/chunks/159-e42e4353683915ca.js","580","static/chunks/580-5a1f7b8bdc214514.js","974","static/chunks/app/page-d817606edc199b72.js"],"default"]
12:I[3401,["567","static/chunks/567-a721b0fe483a718a.js","159","static/chunks/159-e42e4353683915ca.js","580","static/chunks/580-5a1f7b8bdc214514.js","974","static/chunks/app/page-d817606edc199b72.js"],"default"]
13:I[3412,["567","static/chunks/567-a721b0fe483a718a.js","159","static/chunks/159-e42e4353683915ca.js","580","static/chunks/580-5a1f7b8bdc214514.js","974","static/chunks/app/page-d817606edc199b72.js"],"default"]
14:I[7222,["567","static/chunks/567-a721b0fe483a718a.js","159","static/chunks/159-e42e4353683915ca.js","580","static/chunks/580-5a1f7b8bdc214514.js","974","static/chunks/app/page-d817606edc199b72.js"],"default"]
15:I[9665,[],"OutletBoundary"]
17:I[4911,[],"AsyncMetadataOutlet"]
19:I[9665,[],"ViewportBoundary"]
1b:I[9665,[],"MetadataBoundary"]
1c:"$Sreact.suspense"
6:["$","$1","c",{"children":[[["$","$L9",null,{}],["$","$La",null,{}],["$","div",null,{"id":"timeline","children":["$","$Lb",null,{}]}],["$","$Lc",null,{}],["$","div",null,{"id":"valdobbiadene","children":["$","$Ld",null,{}]}],["$","div",null,{"id":"difference","children":["$","$Le",null,{}]}],["$","div",null,{"id":"wines","children":["$","$Lf",null,{}]}],["$","div",null,{"id":"casa","children":["$","$L10",null,{}]}],["$","div",null,{"id":"lifestyle","children":["$","$L11",null,{}]}],["$","$L12",null,{}],["$","$L13",null,{}],["$","$L14",null,{}]],null,["$","$L15",null,{"children":["$L16",["$","$L17",null,{"promise":"$@18"}]]}]]}]
7:["$","$1","h",{"children":[null,[["$","$L19",null,{"children":"$L1a"}],["$","meta",null,{"name":"next-size-adjust","content":""}]],["$","$L1b",null,{"children":["$","div",null,{"hidden":true,"children":["$","$1c",null,{"fallback":null,"children":"$L1d"}]}]}]]}]
1a:[["$","meta","0",{"charSet":"utf-8"}],["$","meta","1",{"name":"viewport","content":"width=device-width, initial-scale=1"}]]
16:null
18:{"metadata":[["$","title","0",{"children":"Valdo Prosecco - Premium Italian Sparkling Wine"}],["$","meta","1",{"name":"description","content":"Discover the legacy of Valdo Prosecco, crafted in the heart of Valdobbiadene with over 90 years of tradition. Experience the finest Italian sparkling wines."}],["$","meta","2",{"name":"author","content":"Valdo Americas"}],["$","meta","3",{"name":"keywords","content":"Valdo Prosecco, Italian sparkling wine, Valdobbiadene, DOCG, premium prosecco, Italian wine"}],["$","meta","4",{"name":"creator","content":"Valdo Americas"}],["$","meta","5",{"name":"publisher","content":"Valdo Americas"}],["$","meta","6",{"name":"robots","content":"index, follow"}],["$","meta","7",{"name":"googlebot","content":"index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"}],["$","link","8",{"rel":"canonical","href":"https://valdo-prosecco-aopb8wlbt-michael-capaces-projects-f6224d63.vercel.app"}],["$","meta","9",{"name":"format-detection","content":"telephone=no, address=no, email=no"}],["$","meta","10",{"name":"google-site-verification","content":"your-google-verification-code"}],["$","meta","11",{"property":"og:title","content":"Valdo Prosecco - Premium Italian Sparkling Wine"}],["$","meta","12",{"property":"og:description","content":"Discover the legacy of Valdo Prosecco, crafted in the heart of Valdobbiadene with over 90 years of tradition."}],["$","meta","13",{"property":"og:url","content":"https://valdo-prosecco-aopb8wlbt-michael-capaces-projects-f6224d63.vercel.app"}],["$","meta","14",{"property":"og:site_name","content":"Valdo Prosecco"}],["$","meta","15",{"property":"og:locale","content":"en_US"}],["$","meta","16",{"property":"og:image","content":"https://valdo-prosecco-aopb8wlbt-michael-capaces-projects-f6224d63.vercel.app/images/Logos/Valdo%20Logo%20New.png"}],["$","meta","17",{"property":"og:image:width","content":"1200"}],["$","meta","18",{"property":"og:image:height","content":"630"}],["$","meta","19",{"property":"og:image:alt","content":"Valdo Prosecco Logo"}],["$","meta","20",{"property":"og:type","content":"website"}],["$","meta","21",{"name":"twitter:card","content":"summary_large_image"}],["$","meta","22",{"name":"twitter:title","content":"Valdo Prosecco - Premium Italian Sparkling Wine"}],["$","meta","23",{"name":"twitter:description","content":"Discover the legacy of Valdo Prosecco, crafted in the heart of Valdobbiadene with over 90 years of tradition."}],["$","meta","24",{"name":"twitter:image","content":"https://valdo-prosecco-aopb8wlbt-michael-capaces-projects-f6224d63.vercel.app/images/Logos/Valdo%20Logo%20New.png"}]],"error":null,"digest":"$undefined"}
1d:"$18:metadata"
