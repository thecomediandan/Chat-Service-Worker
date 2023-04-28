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

self.addEventListener("message", (e) => {
  console.log("Mensaje recibido del navegador:");
  console.log(e.data); // Para enviar un mensaje desde el Service Worker, accedemos al metodo source
  e.source.postMessage("Saludando al navegador.");
});