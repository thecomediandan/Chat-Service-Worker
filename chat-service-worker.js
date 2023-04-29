////////////////////////////////////////////////////////
// Service Worker (nombreServiceWorker.js)
// Para señalar el Service Worker se utiliza self algo como el this
self.addEventListener("install", (e) => {
  console.log("Service Worker instalado.");
});

self.addEventListener("activate", () => {
  console.log("Service Worker está activo.");
});

self.addEventListener("fetch", () => {
  console.log("Service Worker interceptando peticion.");
});

let apiMessage = [];
self.addEventListener("message", (e) => {
  console.log("Mensaje recibido del navegador:");
  if (e.data[0].issue == 'getUser') {
    e.source.postMessage([{'issue': 'setUser'}, {'setUser': e.source.id}, apiMessage]);
    console.log("idTab: " + e.source.id);
    console.log('issue: ' + e.data[0].issue);
  }
  if (e.data[0].issue == 'message') {
    apiMessage.push(e.data[1]);
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        console.log(client);
        client.focused = true;
        client.postMessage([{'issue': 'message'}, apiMessage]);
        client.focused = false;   
      });
    })
  }
});
