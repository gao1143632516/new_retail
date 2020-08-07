// import { asyncRouterMap, constantRouterMap } from 'src/router'
const _import = require('./_import_' + process.env.NODE_ENV);

const page = {
  state: {
    // routers: constantRouterMap,
    routes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.routes = routes
      // state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    addPages({
      commit
    }, pages) {
      var routes = [];
      for (page in pages) {
        var section = page.url.split('/');
        if (section.length !== 3) {
          continue;
        }
        switch (section[2]) {
          case 'complex':
            routes.push({
              path: section[0] + '/' + section[1],
              component: Layout,
              children: [{
                path: section[2],
                component: _import('page/complex'),
                name: page.name
              }]
            });
            break;
          default:
            return;
        }
      }
      var _router = vm.$router;
      _router.addRoutes(routes);
      commit('SET_ROUTES', routes);
    },
  }
};

export default page;
