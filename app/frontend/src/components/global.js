global.ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
global.chat_socket = new ReconnectingWebSocket(ws_scheme + '://' + window.location.host + "/ws/api/");

global.change_socket = function(url){
    global.chat_socket = null;
    let ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
    let chat_socket = new ReconnectingWebSocket(ws_scheme + '://' + window.location.host + '/ws/api/'+url);
    global.chat_socket = chat_socket;
}

