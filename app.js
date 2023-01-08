const http = require('http')
const express = require('express')
const WebSocket = require('ws')
const app = express()
const port = 80

app.use('/', express.static('public'));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server })

var parsedData = '';
var sendRaw = '';

wss.on('connection', ws => {

  var interval = setInterval(function(){
    ws.send(sendRaw);
  }, 100);

  ws.on('close', function close() {
    clearInterval(interval);
  });
})

const wss2 = new WebSocket.Server({ port: 81 })
wss2.on("connection", ws => {
        console.log("New Client Conected");
        ws.addEventListener("message", (event) => {
                sendRaw = event.data;
                console.log('Received', event.data);
        });
        ws.on("close", () => {
                console.log("The client has disconnected");
        });
        ws.onerror = function () {
                console.log("Error occured")
        }
});

var options = {
  hostname: '127.0.0.1'
  ,port: 1234
  ,path: '/'
  ,method: 'GET'
  ,headers: { 'Content-Type': 'application/json' }
};

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})