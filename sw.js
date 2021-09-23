const STATIC_CACHE_NAME = 'site-static-v1';
const DYNAMIC_CACHE_NAME = 'site-dynamic-v1';
const ASSETS = [//Los ASSETS son archivos en ruta para pre-cargar
    '/',
    '/index.html',
    '/manifest.json',
    '/js/app.js',

]

const LIMIT_CACHE_SIZE = (nameCache, size) =>{
    caches.open(nameCache).then(cache => {
        cache.keys().then(keys => {
            if(keys.length > size){
                cache.delete(keys[0]).then(LIMIT_CACHE_SIZE(nameCache,size))
            }
        })
    })
};

self.addEventListener('install', evento =>{
    // console.log('Service Worker Has Been Installed');

    //Carga los archivos en caché
    evento.waitUntil( 
        caches.open(STATIC_CACHE_NAME)
        .then(cache =>{
            cache.addAll(ASSETS);
        })
    );

});

self.addEventListener('activate', evento =>{
    // console.log('Service Worker Has Been Activated');
    //Borra los caché anteriores
    evento.waitUntil(
        caches.keys().then ( 
            keys => {
                return Promise.all ( 
                    keys.filter( key => key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME) 
                                .map ( key => caches.delete(key) )
                                )
            }
        )
    );
});

self.addEventListener('fetch', evento =>{//Peticiones
    if(navigator.onLine) {
        console.log('Online');
    } else {
    evento.respondWith(
        caches.match( evento.request )
            .then( cacheRespuesta => { 
                //Si hay en caché, obtén de caché. Si no, hace la petición
                return cacheRespuesta || fetch(evento.request)
                    .then( fetchRespuesta => { //caché dinámico
                            return caches.open( STATIC_CACHE_NAME )
                                .then ( cache => {
                                    cache.put ( evento.request.url, fetchRespuesta.clone() );
                                    //Limite de espacio de caché
                                    //RECORDAR CAMBIARLO AL CRECER APLICACIÓN
                                    LIMIT_CACHE_SIZE(DYNAMIC_CACHE_NAME, 25);
                                    return fetchRespuesta;
                                })
                        }
                    );
            }).catch(() => {
                //Solo ocurre si pide un archivo html que no tenga en caché
                if(evento.request.url.indexOf('.html') > -1){
                    return caches.match('./fallback.html');
                }
            })
    );
    }
});