// import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App.vue'
import store from './store'

console.log(store.state)
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
