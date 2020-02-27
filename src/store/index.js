import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { 
    one_table: [],
    two_table: [],
    arr: { year: 20, great: 10 } 
  },
  mutations: {
    one_table: (state, array) => {
      state.one_table = array;
    },
    two_table: (state, array) => {
      state.two_table = array;
    },
  },
  actions: {},
  modules: {},
  getters: {
    arr: state => {
      return state.arr;
    },
    one_table: state => {
      return state.one_table;
    },
    two_table: state => {
      return state.two_table;
    },
  }
});
