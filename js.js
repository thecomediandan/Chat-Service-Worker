"strict mode";
// Script Principal, navegador
// Verificamos si el navegador admite Service Worker
if (navigator.serviceWorker) {
    // Registramos el archivo que nos servirá de Service Worker
    navigator.serviceWorker.register("chat-service-worker.js");
};

let idUser;
// Para enviarle un mensaje al Service Worker necesitamos saber si esta listo con el metodo ready el cual devuelve una promesa, el cual tiene una propiedad llamada active que contiene el metodo postMessage.
navigator.serviceWorker.ready.then(res => {
    res.active.postMessage([{'issue': 'getUser'}]);
});

let apiRequest;

function createMessageElement(msg, id){
    let fragment = document.createDocumentFragment();
    let chatContent = document.createElement('div');

    chatContent.textContent = msg;
    if (id == idUser) {
        chatContent.classList = 'message my-message';   
    } else {
        chatContent.classList = 'message your-message';
    }
    
    fragment.appendChild(chatContent);
    return fragment;
}

function refreshChatZone(){
    let chatZone = window.document.querySelector('.chat-zone');
    chatZone.innerHTML = "";
    for (const chat of apiRequest) {
        console.log(chat);
        let fragment = createMessageElement(chat.message, chat.idUser);
        chatZone.appendChild(fragment);
    }
}

// Para que el navegador escuche los mensajes del Service Worker
navigator.serviceWorker.addEventListener("message", e=>{
    console.log("Mensaje recibido del Service Worker:");
    if (e.data[0].issue == 'setUser') {
        idUser = e.data[1].setUser;
        console.log("idUser: " + idUser);
    }
    if (e.data[0].issue == 'message') {
        apiRequest = e.data[1];
        console.log(e.data[1]);
        refreshChatZone();
        
        // let chatZone = window.document.querySelector('.chat-zone');
        // let fragment;
        // if (e.data[1].idUser == idUser) {
        //     fragment = createMessageElement(e.data[1].message, true);
        // }else{
        //     fragment = createMessageElement(e.data[1].message, false);
        // }
        // chatZone.appendChild(fragment);
    }

});

const inputText = document.getElementById('input-text');
const inputButton = document.getElementById('input-button');

inputButton.addEventListener('click', ()=>{
    let msg = inputText.value;
    navigator.serviceWorker.ready.then(res => {
        if(msg != ""){
            res.active.postMessage([{'issue': 'message'}, {'message': msg, 'idUser': idUser}]);
        }else{
            alert("No puedes enviar mensajes vacios.");
        }    
    });
});