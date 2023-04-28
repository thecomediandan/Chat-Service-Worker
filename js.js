"strict mode";
// Script Principal, navegador
// Verificamos si el navegador admite Service Worker
if (navigator.serviceWorker) {
    // Registramos el archivo que nos servirá de Service Worker
    navigator.serviceWorker.register("chat-service-worker.js");
};
// Para enviarle un mensaje al Service Worker necesitamos saber si esta listo con el metodo ready el cual devuelve una promesa, el cual tiene una propiedad llamada active que contiene el metodo postMessage.
navigator.serviceWorker.ready.then(
    res => res.active.postMessage("Saludando al Service Worker.")
);
// Para que el navegador escuche los mensajes del Service Worker
navigator.serviceWorker.addEventListener("message", e=>{
    console.log("Mensaje recibido del Service Worker:");
    console.log(e.data);
});