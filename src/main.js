// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

export const eventBus = new Vue({
  // methods: {
  //   changeDifficulte () {
  //     // eslint-disable-next-line
  //     this.$emit('difficulteSet', difficulte)
  //   }
  // }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
