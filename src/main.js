// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as Firebase from 'Firebase'
import Guid from 'Guid'


// let newGuid = Guid.raw();

// firebaseDb.ref('notes').push({
//   title: 'Hello world',
//   content: 'Lorem ipsum'
// })

// firebaseDb.ref('notes').on('value', (snapshot) => {
//   let notes = snapshot.val()
//   let count = 0
//   snapshot.forEach((child) => { count++ })
//   window.alert(`Total Notes Count = ${count}`)
// })


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
