const net = require('net')
const loadModule = require('./utils/loadModule')
let onServerClientConn = function (socket) {
  console.log(`클라이언트가 연결되었습니다: ${socket.remoteAddress}:${socket.remotePort}`)
}
onServerClientConn = loadModule('./onServerClientConn.js', onServerClientConn)
let onServerReceiveData = function (data) {
  console.log(data.toString())
}
onServerReceiveData = loadModule('./onServerReceiveData.js', onServerReceiveData)
let onServerClientEnd = function (data) {
  console.log('클라이언트가 연결을 끊었습니다.')
}
onServerClientEnd = loadModule('./onServerClientEnd.js', onServerClientEnd)
let onServerError = function (error) {
  console.error(error)
}
onServerError = loadModule('./onServerError.js', onServerError)

function runServer (port) {
  server.listen(port, () => {
    console.log(`${port} : 서버가 시작되었습니다.`)
  })
}

const server = net.createServer(socket => {
  onServerClientConn(socket)

  // 클라이언트로부터 데이터를 받으면 콘솔에 출력합니다.
  socket.on('data', data => onServerReceiveData(data))

  // 클라이언트와의 연결이 끊어지면 콘솔에 출력합니다.
  socket.on('end', onServerClientEnd)
  socket.on('error', onServerError)
})

module.exports = runServer
