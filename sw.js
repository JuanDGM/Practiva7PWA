

const CACHE_STATIC    = 'static-v1';
const CACHE_INMUTABLE = 'inmutable-v1';
const CACHE_DYNAMIC   = 'dynamic-v1';


const APPSHELL=[
    'index.html',
    'js/app.js',
    'css/styles.css',
    'view/home.html',
    'manifest.json'
];

const APPSHELL_INMUTABLE=[
    'librery/Bootstrap/css/bootstrap.min.css',
    'librery/js/jquery-3.2.1.min.js',
    'librery/Bootstrap/js/bootstrap.min.js'
];



self.addEventListener('install', e=>{
    
    caches.open(CACHE_STATIC).then(res=>{
        res.addAll(APPSHELL);
    });
    
    
    caches.open(CACHE_INMUTABLE).then(res=>{
        res.addAll(APPSHELL_INMUTABLE);
    });
    
    
});



self.addEventListener('fetch', e=>{
   
   
   const respuesta = caches.match(e.request).then(res=>{
       
       if(res){
           return res;
       }else{
           
           return fetch(e.request).then(newRes=>{
               
               return caches.open(CACHE_DYNAMIC).then(cache=>{
                   
                   cache.put(e.request, newRes.clone());
                   return newRes.clone();
                   
               });
               
           });
           
       }
       
   });
   
   e.respondWith(respuesta); 
});
