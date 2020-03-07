import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state: { 
    one_table: [],
    two_table: [],
  },
  mutations: {
    setOneTable(state, table) {
      state.one_table = table;
    },
    setTwoTable(state, table) {
      state.two_table = table;
    },
  },
  actions: {},
  modules: {},
  getters: {
    getOneTable: state => {
      return state.one_table;
    },
    getTwoTable: state => {
      return state.two_table;
    },
  }
});
