import Vue from 'vue'
// import errLog from '@/store/errLog'

// 生产环境错误日志
Vue.config.errorHandler = function (err, vm) {
  console.log(err, window.location.href)
//   errLog.pushLog({
//     err,
//     url: window.location.href,
//     vm
//   })
}
