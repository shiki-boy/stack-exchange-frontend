import Vue from 'vue'
import Vuex from 'vuex'
import Api from '../services/Api' 

Vue.use(Vuex)

export const store = new Vuex.Store({
  state:{
    user:{
      token:null,
      isAuth:false,
      username:null
    }
  },
  getters:{
    isAuth:state=>{
      return state.user.isAuth
    }
  },
  mutations:{
    setUser:(state,payload) =>{
      state.user.isAuth = true
      state.user.token = payload.token
      state.user.username = payload.username
      localStorage.setItem('token',payload.token)
      localStorage.setItem('username',payload.username)
      localStorage.setItem('expiresIn','1h')
    },
    logOutUser:(state) => {
      state.user.token = null
      state.user.username = null
      state.user.isAuth = false
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('expiresIn')
    }
  },
  actions:{
    setUser:context => {
      context.commit('setUser')
    },
    tryAutoLogin:context=>{
      console.log('running');
      let now = new Date()
      let token = localStorage.getItem('token')
      let username = localStorage.getItem('username')
      if (now >= localStorage.getItem('expiresIn')) return
      if (!token) return
      let config = {
        headers: {
          'x-auth': token,
          'x-ts': 1
        }
      };
      console.log('api');
      Api().post('user/tryAutoLogin',null, config)
      .then(response =>{
        console.log(response.data);
        if (response.data.msg === 'correct'){
          context.commit('setUser',{token,username})
        }
      })
    }
  }
})
