import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router);

/* layout */
import Layout from '../views/layout/Layout';
// import {
//   tree2array
// } from 'utils/menu.js'


/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [{
    path: '/login',
    component: _import('login/index'),
    hidden: true
  },
  {
    path: '/authredirect',
    component: _import('login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: _import('error/404'),
    hidden: false
  },
  {
    path: '/401',
    component: _import('error/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
    }]
  },
  {
    path: '/introduction',
    component: Layout,
    redirect: '/introduction/index',
    icon: 'xinrenzhinan',
    noDropdown: true,
    children: [{
      path: 'index',
      component: _import('introduction/index'),
      name: '简述'
    }]
  },
]
const router = new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});

function setDocumentTitle(title) {
  document.title = title;
  let ua = navigator.userAgent;
  if (/\bMicroMessenger\/([\d\.]+)/.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    var i = document.createElement('iframe');
    i.src = '/favicon.ico';
    i.style.display = 'none';
    i.onload = function () {
      setTimeout(function () {
        i.remove();
      }, 9);
    };
    document.body.appendChild(i);
  }
};

function tree2array(_tree, _array) {
// console.log(_array);
// console.log(!_array);
  if (!_array) {
    return;
  }
  for (var _i of _tree) {
    if (_i.is_leaf) {
     // console.log(_i.navigation_name, _i.url);
      _array.push(_i);
    } else if (_i.list && _i.list.length !== 0) {
      tree2array(_i.list, _array);
    }
  }
}

function addRoutes(menulist) {
  //console.log(menulist);
  var menus = [];
  tree2array(menulist, menus);
  //console.log(menus);
  var routes = [];
  for (var menu of menus) {

console.log(menu.page_path);
    var section = menu.page_path.split('/',4);
    var im = menu.page_path.substring(1);
    console.log(section[3])
    if (section.length <= 2||section[3].indexOf("?")!=-1) {
      continue;
    }

          routes.push({
            path:"/" + section[1],
            component: Layout,
            children: [{
              path: section[2]+"/"+section[3],
              component: _import(im),
              name: menu.navigation_name,
              meta: {
                pageTitle: menu.navigation_name
              }
            }]
          });


    // switch (section[3]) {
    //   case 'complex':
    //     routes.push({
    //       path: section[0] + '/' + section[1] + '/' + section[2],
    //       component: Layout,
    //       children: [{
    //         path: section[3],
    //         component: _import('page/complex'),
    //         name: menu.navigation_name,
    //         meta: {
    //           pageTitle: menu.navigation_name
    //         }
    //       }]
    //     });
    //     break;
    //     case 'table':
    //     routes.push({
    //       path: section[0] + '/' + section[1] + '/' + section[2],
    //       component: Layout,
    //       children: [{
    //         path: section[3],
    //         component: _import('page/table'),
    //         name: menu.navigation_name,
    //         meta: {
    //           pageTitle: menu.navigation_name
    //         }
    //       }]
    //     });
    //     break;
    //     case 'form':
    //     routes.push({
    //       path: section[0] + '/' + section[1] + '/' + section[2],
    //       component: Layout,
    //       children: [{
    //         path: section[3],
    //         component: _import('page/form'),
    //         name: menu.navigation_name,
    //         meta: {
    //           pageTitle: menu.navigation_name
    //         }
    //       }]
    //     });
    //     break;
    //   default:
    //     break;
    // }
  }
  router.addRoutes(routes);
}

const whiteList = ['/login', '/authredirect', '/404', '/401']; // 不重定向白名单
router.beforeEach((to, from, next) => {

  var vm = router.app;
  var store = vm.$store;
  // if (!store) {
  //   next();
  //   return;
  // }
  // NProgress.start(); // 开启Progress
  if (!!to.meta.pageTitle) {
    setDocumentTitle(to.meta.pageTitle);
    // vm.$root.data.pageTitle = to.meta.pageTitle;
  }
  if (whiteList.indexOf(to.path) !== -1) {
    next();
    return;
  }

  switch (store.getters.loginStatus) {
    case 1: //cookie
      store.dispatch('GetLoginInfo').then(res => {
        //addroutes();
        //  alert(1)

        addRoutes(res);
        next({ ...to
        });
      }).catch((r) => {
      // alert()
          console.log(r);
        store.dispatch('FedLogOut').then(() => {
          next({
            path: '/login'
          });
        })
      })
      break;
    case 2: //login success
      if (to.path === '/login') {
        next({
          path: '/'
        });
      } else if (to.matched.length === 0) {
        next({
          path: '/404'
        });
      } else {
        next();
      }
      break;
    default:
      next({
        path: '/login'
      });
      break;
  }

});

router.afterEach(() => {
  // NProgress.done(); // 结束Progress
});

export default router;

/*
export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    name: '权限测试',
    icon: 'quanxian',
    meta: { role: ['admin'] },
    noDropdown: true,
    children: [{ path: 'index', component: _import('permission/index'), name: '权限测试页', meta: { role: ['admin'] } }]
  },
  {
    path: '/components',
    component: Layout,
    redirect: '/components/index',
    name: '组件',
    icon: 'zujian',
    children: [
      { path: 'index', component: _import('components/index'), name: '介绍 ' },
      { path: 'tinymce', component: _import('components/tinymce'), name: '富文本编辑器' },
      { path: 'markdown', component: _import('components/markdown'), name: 'Markdown' },
      { path: 'jsoneditor', component: _import('components/jsoneditor'), name: 'JSON编辑器' },
      { path: 'dndlist', component: _import('components/dndlist'), name: '列表拖拽' },
      { path: 'splitpane', component: _import('components/splitpane'), name: 'SplitPane' },
      { path: 'avatarupload', component: _import('components/avatarUpload'), name: '头像上传' },
      { path: 'dropzone', component: _import('components/dropzone'), name: 'Dropzone' },
      { path: 'sticky', component: _import('components/sticky'), name: 'Sticky' },
      { path: 'countto', component: _import('components/countTo'), name: 'CountTo' },
      { path: 'mixin', component: _import('components/mixin'), name: '小组件' },
      { path: 'backtotop', component: _import('components/backToTop'), name: '返回顶部' }
    ]
  },
  {
    path: '/charts',
    component: Layout,
    redirect: '/charts/index',
    name: '图表',
    icon: 'tubiaoleixingzhengchang',
    children: [
      { path: 'index', component: _import('charts/index'), name: '介绍' },
      { path: 'keyboard', component: _import('charts/keyboard'), name: '键盘图表' },
      { path: 'keyboard2', component: _import('charts/keyboard2'), name: '键盘图表2' },
      { path: 'line', component: _import('charts/line'), name: '折线图' },
      { path: 'mixchart', component: _import('charts/mixChart'), name: '混合图表' }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: '综合实例',
    icon: 'zonghe',
    children: [
      {
        path: '/example/table',
        component: _import('example/table/index'),
        redirect: '/example/table/table',
        name: 'Table',
        icon: 'table',
        children: [
          { path: 'dynamictable', component: _import('example/table/dynamictable'), name: '动态table' },
          { path: 'dragtable', component: _import('example/table/dragTable'), name: '拖拽table' },
          { path: 'inline_edit_table', component: _import('example/table/inlineEditTable'), name: 'table内编辑' },
          { path: 'table', component: _import('example/table/table'), name: '综合table' }
        ]
      },
      { path: 'form/edit', icon: 'ziliaoshouce', component: _import('example/form'), name: '编辑Form', meta: { isEdit: true } },
      { path: 'form/create', icon: 'yinhangqia', component: _import('example/form'), name: '创建Form' },

      { path: 'tab/index', icon: 'mobankuangjia', component: _import('example/tab/index'), name: 'Tab' }
    ]
  },
  {
    path: '/errorpage',
    component: Layout,
    redirect: 'noredirect',
    name: '错误页面',
    icon: '404',
    children: [
      { path: '401', component: _import('error/401'), name: '401' },
      { path: '404', component: _import('error/404'), name: '404' }
    ]
  },
  {
    path: '/errlog',
    component: Layout,
    redirect: 'noredirect',
    name: 'errlog',
    icon: 'bug',
    noDropdown: true,
    children: [{ path: 'log', component: _import('errlog/index'), name: '错误日志' }]
  },
  {
    path: '/excel',
    component: Layout,
    redirect: 'noredirect',
    name: 'excel',
    icon: 'EXCEL',
    children: [
      { path: 'download', component: _import('excel/index'), name: '导出excel' },
      { path: 'download2', component: _import('excel/selectExcel'), name: '选择导出excel' }
    ]
  },
  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    name: 'theme',
    icon: 'theme',
    noDropdown: true,
    children: [{ path: 'index', component: _import('theme/index'), name: '换肤' }]
  },

  { path: '*', redirect: '/404', hidden: true }
];
*/
