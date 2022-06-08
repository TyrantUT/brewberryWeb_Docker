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

  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })

  var interval = setInterval(function(){
    ws.send(sendRaw)
  }, 100);  

  ws.on('close', function close() {
    clearInterval(interval);
  });
})

const poll = {
    pollB: function() {
        http.get('http://127.0.0.1:1234', (res) => {
            const { statusCode } = res;

            let error;
            if (statusCode !== 200) {
                error = new Error(`Request Failed.\n` +
                    `Status Code: ${statusCode}`);
            }

            if (error) {
                console.error(error.message);
                res.resume();
            } else {
                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', () => {
                    try {
                        parsedData = JSON.parse(rawData);
                        sendRaw = rawData;
                        setTimeout(poll.pollB, 1000); // request again in 10 secs
                    } catch (e) {
                        console.error(e.message);
                    }
                });
            }
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    }
}

poll.pollB();

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
