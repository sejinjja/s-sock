const net = require('net')
const loadModule = require('./loadModule')
let onClientConn = function (socket) {
  console.log(`클라이언트가 연결되었습니다: ${socket.remoteAddress}:${socket.remotePort}`)
}
onClientConn = loadModule('./onClientConn.js', onClientConn)
let onClientMessage = function (data) {
  console.log(data.toString())
}
onClientMessage = loadModule('./onClientMessage.js', onClientMessage)
let onClientEnd = function (data) {
  console.log('클라이언트가 연결을 끊었습니다.')
}
onClientEnd = loadModule('./onClientEnd.js', onClientEnd)

function runServer (port) {
  server.listen(port, () => {
    console.log('서버가 시작되었습니다.')
  })
}

const server = net.createServer(socket => {
  onClientConn(socket)

  // 클라이언트로부터 데이터를 받으면 콘솔에 출력합니다.
  socket.on('data', data => {
    socket.on('data', onClientMessage)
  })

  // 클라이언트와의 연결이 끊어지면 콘솔에 출력합니다.
  socket.on('end', () => {
    socket.on('end', onClientEnd)
  })
})

module.exports = runServer
