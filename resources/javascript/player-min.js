//Status constants
var SESSION_STATUS = Flashphoner.constants.SESSION_STATUS;
var STREAM_STATUS = Flashphoner.constants.STREAM_STATUS;
 
//Websocket session 
var session;
 
//Init Flashphoner API on page load
function init_api() {
    Flashphoner.init({});
}
 
//Connect to WCS server over websockets
function connect() {
    session = Flashphoner.createSession({
        urlServer: "wss://nukeops.com/"
    }).on(SESSION_STATUS.ESTABLISHED, function(session) {
        playStream(session);
    });
}
 
//Play stream 
function playStream(session) {
    session.createStream({
        name: "live_stream",
        display: document.getElementById("myVideo"),
    }).play();
}