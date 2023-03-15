const net = require('net')
const client = new net.Socket()
const readline = require('readline')
/*
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log(process.stdin)
console.log(rl)
*/
const loadModule = require('./utils/loadModule')
let onClientServerConn = function (client) {
  client.write('서버 안녕!')
}
onClientServerConn = loadModule('./onClientServerConn.js', onClientServerConn)
let onClientReceiveData = function (data) {
  console.log(data.toString())
}
onClientReceiveData = loadModule('./onClientReceiveData.js', onClientReceiveData)
let onClientClose = function (data) {
  console.log('클라이언트가 연결을 끊었습니다.')
}
onClientClose = loadModule('./onClientClose.js', onClientClose)

function runClient (ip, port) {
  client.connect(port, ip, () => onClientServerConn(client))
}

client.on('data', onClientReceiveData)

client.on('close', onClientClose)

module.exports = runClient
