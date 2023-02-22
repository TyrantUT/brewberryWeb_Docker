# Web Interface for Qt Homebrew interface

## Install
clone the repository
```
git clone https://github.com/TyrantUT/brewberryWeb_Docker.git
```

## Firewall
Make sure your host has port tcp/80-81 open from the internet, or wherever you are connecting your interface from

## Running
Launch the Node app with
```
node app.js
```

### Note
You will need to modify your /public/html/index.html file to include the actual public IP of your host
Change line 61 from
```
const connection = new WebSocket('ws://localhost:80')
```
To
```
const connection = new WebSocket('ws://{Your Public IP}:80')
```
