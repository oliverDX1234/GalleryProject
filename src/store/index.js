import { createStore } from 'vuex'
import authentication from "@/store/modules/authentication";
import gallery from "@/store/modules/gallery";

export default createStore({
  state: {

    showActionNotification: false
  },

  getters: {
    show(state){

      return state.showActionNotification;

    }
  },

  mutations: {
    SHOW(state){
      state.showActionNotification = true;
      setTimeout( () => {
        state.showActionNotification = false;
      }, 2300)
    }
  },
  actions: {
    show(context){

      context.commit("SHOW");
    }
  },
  modules: {
    authentication,
    gallery
  }
})
