import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state: { 
    one_table: [],
    two_table: [],
    duplicate_one_table: [],
    duplicate_two_table: [],
  },
  mutations: {
    setOneTable(state, table) {
      state.one_table = table;
    },
    setTwoTable(state, table) {
      state.two_table = table;
    },
    setDuplicateOneTable(state, table) {
      state.duplicate_one_table = table;
    },
    setDuplicateTwoTable(state, table) {
      state.duplicate_two_table = table;
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
    getDuplicateOneTable: state => {
      return state.duplicate_one_table;
    },
    getDuplicateTwoTable: state => {
      return state.duplicate_two_table;
    },
  }
});
