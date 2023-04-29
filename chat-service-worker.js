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
let users = [];
let count = 0;
self.addEventListener("message", (e) => {
  console.log("Mensaje recibido del navegador:");
  if (e.data[0].issue == 'getUser') {
    users[count] = count;
    e.source.postMessage([{'issue': 'setUser', 'setUser': count}]);
    console.log("idTab: " + e.source.id);
    console.log('issue: ' + e.data[0].issue);
    count ++;
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
