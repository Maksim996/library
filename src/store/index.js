import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { arr: { year: 20, great: 10 } },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    arr: state => {
      return state.arr;
    }
  }
});
