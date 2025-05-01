import { defineNuxtPlugin } from '#app'
import { io, Socket } from 'socket.io-client'

export default defineNuxtPlugin((nuxtApp) => {
  const socket: Socket = io('https://example.com', {
    autoConnect: false, 
  })
  nuxtApp.provide('socket', socket)
})
