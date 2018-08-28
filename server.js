const WebSocket = require ('ws')
const server = new WebSocket.Server({
  port: 5000
})

let counter = 0

server.on('connection', (socket) => {
  console.log('connected', ++counter)
  socket.on('message', (data) => {
    console.log(data)
    server.clients.forEach((s) => {
      s.send(data) // sende data tilbake
    })
  })
})
