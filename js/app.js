

let url = window.location.href;

let swLocation = '/Practiva7PWA/sw.js';

if(navigator.serviceWorker){
   
    if(url.includes('localhost')){
        
    swLocation = './sw.js';   
        
    }
    
    navigator.serviceWorker.register(swLocation);
    
}