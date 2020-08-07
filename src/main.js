// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';



import store from './store';
import router from './router';


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import 'assets/custom-theme/index.css'; // 换肤版本element-ui css
// import NProgress from 'nprogress'; // Progress 进度条
// import 'nprogress/nprogress.css'; // Progress 进度条 样式
// import 'normalize.css/normalize.css'; // normalize.css 样式格式化
import 'assets/iconfont/iconfont'; // iconfont 具体图标见https://github.com/PanJiaChen/vue-element-admin/wiki
import * as filters from './filters'; // 全局vue filter
// import Multiselect from 'vue-multiselect'; // 使用的一个多选框组件，element-ui的select不能满足所有需求
// import 'vue-multiselect/dist/vue-multiselect.min.css'; // 多选框组件css
// import Sticky from 'components/Sticky'; // 粘性header组件
import IconSvg from 'components/Icon-svg'; // svg 组件
// import vueWaves from './directive/waves'; // 水波纹指令
// import errLog from 'store/errLog'; // error log组件
// import './mock/index.js';  // 该项目所有请求使用mockjs模拟
// import { getToken } from 'utils/auth';
// import { getSessionkey } from 'utils/cookies';

// register globally
// Vue.component('multiselect', Multiselect);
// Vue.component('Sticky', Sticky);
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

import Blockquote from './components/blockquote';

Vue.use(Blockquote);

import restrict from './directive/inputValidate';
Vue.use(restrict);
import App from './App';
//导入打印组件
import print from 'print-js';





Vue.component('icon-svg', IconSvg)

// import './permission' // 权限
Vue.component('icon',Icon)
Vue.use(ElementUI);
// Vue.use(vueWaves);

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});



Vue.config.productionTip = false;

// 生产环境错误日志
if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function (err, vm) {
    console.log(err, window.location.href);
    errLog.pushLog({
      err,
      url: window.location.href,
      vm
    })
  };
}



var vue=new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {
    App
  }
});

//console.log(vue);
