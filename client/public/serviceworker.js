console.log("I am from service worker");
console.log(" iam registered succesfully");
let cacheData = "appV1"
this.addEventListener("install",(event)=>{
    event.waitUntil(
        caches.open(cacheData)
        .then((cache)=>{
            cache.addAll([
   
            ])
        })
    )
})

this.addEventListener("fetch" , (event)=>{
    event.respondWith(
        caches.match(event.request)
        .then((resp)=>{
            if(resp){
                return resp;
            }
        })
    )
})