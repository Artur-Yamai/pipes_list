import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

const URL = 'http://localhost:3000';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pipes: [],
    states: [],
    purpouses: []
  },

  getters: {
    getPipes(state) {
      return state.pipes
    },

    getStates(state) {
      return state.states
    },

    getPurpouses(state) {
      return state.purpouses
    },

    getTheStateById: state => id => {
      let hit = state.states.find(elem => elem.id == id)
      return hit
    },

    getThePurpousById: state => id => {
      let hit = state.purpouses.find(elem => elem.id == id)
      return hit
    },

    getTheStateByValue: state => value => {
      let hit = state.states.find(elem => elem.value == value)
      return hit.id
    },

    getThePurpousByValue: state => value => {
      let hit = state.purpouses.find(elem => elem.value == value)
      return hit.id
    }
  },

  mutations: {
    getPipes(state, pipesList) {
      state.pipes = pipesList.slice(0,30);
    },

    addPipe(state, newPipe) {
      state.pipes.unshift(newPipe)
    },

    updatedPipe(state, newData) {
      let index = state.pipes.findIndex(elem => elem.id === newData.id);

      for(let pipe in state.pipes[index]) {
        state.pipes[index][pipe] = newData[pipe]
      }      
    },

    deletePipe(state, pipeID) {
      let elem = state.pipes.findIndex(elem => elem.id === pipeID);

      state.pipes.splice(elem,1)
    },


    getStates(state, allStates) {
      state.states = allStates;
    },


    getPurpouses(state, allPurpouses) {
      state.purpouses = allPurpouses;
    }
  },

  actions: {
    GET_PIPES({commit}) {
      axios.get(`${URL}/pipes`)
        .then(resp => {
          commit('getPipes', resp.data)
        }).catch(err => console.error(err))
    },

    ADD_PIPE({commit}, payLoad) {
      commit('addPipe', payLoad);
    },

    UPDATED_PIPE({commit}, payLoad) {
      commit('updatedPipe', payLoad);
    },

    DELETE_PIPE({commit}, payLoad) {
      commit('deletePipe', payLoad);
    },


    GET_STATES({commit}) {
      axios.get(`${URL}/states`)
        .then(resp => {
          commit('getStates', resp.data)
        }).catch(err => console.error(err))
    },


    GET_PURPOUSES({commit}) {
      axios.get(`${URL}/purpouses`)      
      .then(resp => {
        commit('getPurpouses', resp.data)   
      }).catch(err => console.error(err))      
    }

  }
})
