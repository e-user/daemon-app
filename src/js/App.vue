<template>
  <div class="app d-flex flex-column justify-content-center align-items-center">
    <div class="backdrop"></div>
    <h1>Daemon</h1>
    <p class="status">{{status}}</p>
  </div>
</template>

<script>
const {URL, WebSocket} = window

export default {
  props: ['url'],
  mounted () {
    const {host, pathname, protocol} = new URL(this.url)
    const ws = protocol === 'https' ? 'wss' : 'ws'
    const socket = new WebSocket(`${ws}://${host}${pathname}socket`)

    this.status = `Connecting to ${socket.url}...`
    socket.addEventListener('open', () => {
      socket.send(JSON.stringify({op: 'hello', data: {version: '0.1'}, 'seq-id': 0}))
    })

    socket.addEventListener('close', () => {
      this.status = 'Connection failed'
    })

    socket.addEventListener('message', ({data: message}) => {
      const {op, data} = JSON.parse(message)
      if (op === 'ack' && data === 'hello') {
        this.status = 'Connected'
        window.open(this.url)
      }
    })
  },
  data () {
    return {
      status: ''
    }
  }
}
</script>

<style scoped>
.app {
  height: 100%;
  color: white;
}

h1 {
  font: 40pt Quattrocento;
}

.backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../../static/daemon.svg) no-repeat 50% 60%;
  background-size: 800px 800px;
  opacity: .05;
}

.status {
  font: 9pt Inconsolata;
}
</style>
