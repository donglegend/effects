import Vue from 'vue'
import Vuex from 'vuex'

import book from './modules/book'
import music from './modules/music'

Vue.use(Vuex)



export default new Vuex.Store({
  modules: {
      book,
      music
  }
})
