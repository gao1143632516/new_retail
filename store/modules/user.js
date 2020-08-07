import {
  loginByUserId,
  getProfile,
  getMenuList
} from 'api/login';

import {
  getSessionkey,
  setSessionkey,
  removeSessionkey
} from 'utils/cookies';


const user = {
  state: {
    userId: 0,
    sessionkey: '',
    merchant_id:'',
    loginStatus: getSessionkey() ? 1 : 0, //0 未登录,1，cookie保存状态，2，登录成功（获取了用户信息和菜单)
    // status: '',
    // code: '',
    // token: getToken(),
    name: '',
    avatar: '',
    menuList: [],
    portalId: 1,
    // introduction: '',
    // roles: [],
    // setting: {
    //   articlePlatform: []
    // }
  },

  mutations: {
    // SET_CODE: (state, code) => {
    //   state.code = code;
    // },
    SET_LOGIN_STATUS: (state, status) => {
      state.loginStatus = status;
    },
    SET_USERID: (state, userId) => {
      state.userId = userId;
    },
    SET_MERCHANT_ID: (state, merchant_id) => {
      state.merchant_id = merchant_id;
    },
    SET_SHOP_ID: (state,shop_id)=>{
      state.shop_id = shop_id;
    },
    SET_SESSIONKEY: (state, sessionkey) => {
      state.sessionkey = sessionkey;
    },
    // SET_INTRODUCTION: (state, introduction) => {
    //   state.introduction = introduction;
    // },
    // SET_SETTING: (state, setting) => {
    //   state.setting = setting;
    // },
    // SET_STATUS: (state, status) => {
    //   state.status = status;
    // },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_MENU_LIST: (state, menuList) => {
      state.menuList = menuList
    },
    LOGIN_SUCCESS: () => {
      console.log('login success')
    },
    LOGOUT_USER: state => {
      state.user = '';
    }
  },

  actions: {
    // 邮箱登录
    LoginByUserId({
      commit
    }, userInfo) {
      const mobile = userInfo.mobile.trim();
      return new Promise((resolve, reject) => {
        loginByUserId(mobile, userInfo.password).then(response => {
         // console.log(response);
          commit('SET_SESSIONKEY', response.data.sessionkey);
          commit('SET_LOGIN_STATUS', 1);
          setSessionkey(response.data.sessionkey);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      var sessionkey = state.sessionkey;
      if (!sessionkey) {
        sessionkey = getSessionkey();
        commit('SET_SESSIONKEY', sessionkey);
      }
      return new Promise((resolve, reject) => {
        getProfile(sessionkey).then(response => {

          commit('SET_USERID', response.data.manager_id);
          commit('SET_NAME', response.data.nick_name);
          commit('SET_AVATAR', response.data.avatar);
          commit('SET_MERCHANT_ID',response.data.merchant_id)
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },
    GetMenuList({
      commit,
      state
    }) {
      var sessionkey = state.sessionkey;
      if (!sessionkey) {
        sessionkey = getSessionkey();
        commit('SET_SESSIONKEY', sessionkey);
      }
      return new Promise((resolve, reject) => {
        getMenuList(sessionkey, state.portalId).then(response => {
          commit('SET_MENU_LIST', response.datalist);
          commit('SET_LOGIN_STATUS', 2);
          resolve(response.datalist);
        }).catch(error => {
          reject(error);
        })
      })
      // commit('SET_MENU_LIST', data);
    },
    GetLoginInfo({
      dispatch,
      commit
    }) {
      return dispatch('GetInfo')
        .then(() => {
          return dispatch('GetMenuList')
        })
    },
    // 第三方验证登录
    // LoginByThirdparty({
    //   commit,
    //   state
    // }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code);
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token);
    //       setToken(response.data.token);
    //       resolve();
    //     }).catch(error => {
    //       reject(error);
    //     });
    //   });
    // },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        commit('SET_SESSIONKEY', '');
        commit('SET_LOGIN_STATUS', 0);
        removeSessionkey();
        resolve();
      });
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        // commit('SET_SESSIONKEY', '');
        // commit('SET_LOGIN_STATUS', 0);
        // removeSessionkey();
        resolve();
      });
    },

    // 动态修改权限
  }
};

export default user;
