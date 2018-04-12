import 'bootstrap'
import './main.scss'
import 'typeface-quattrocento'
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: r => r(App, {
    props: {
      url: 'http://localhost:8080'
    }
  })
})
