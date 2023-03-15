#!/usr/bin/env node
/**
 * MIT License
 * Copyright (c) 2023 sejiwork
 * Permission is hereby granted ... LICENSE.txt
 * */
const sockServer = require('./server')
const sockClient = require('./client')

const args = process.argv.slice(2)
let [type, ...host] = args
let ip, port
type = type || 's'

if (type === 's') {
  [port] = host
} else {
  [ip, port] = host
  ip = ip || 'localhost'
}

port = port || 5000

if (type === 's') {
  sockServer(port)
} else if (type === 'c') {
  sockClient(ip, port)
}
