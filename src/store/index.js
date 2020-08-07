import Vue from 'vue';
import Vuex from 'vuex';
import web from './modules/web';
import user from './modules/user';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app:web,
    user:user,
  },
  getters
});

export default store
