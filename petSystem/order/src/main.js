import Vue from 'vue'
import App from './App.vue'
// 引入 element-ui
import './plugins/element.js'

import router from './router'
import store from './store'
import echarts from "echarts";

// axios. defaults . baseURL = '/api'


Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;

router.beforeEach((to, from, next) => {
  if (to.path === '/Login' || to.path === '/register' || store.state.user) {
    next()
  } else {
    alert('你还没有登陆');
    next({
      name: "loginLink"
    });
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
