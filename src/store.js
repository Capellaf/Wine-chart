import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        itemsQuantity: 0,
        width: 0
    },
    mutations: {
        SET_WINDOW_WIDTH(state, width) {
            state.width = width;
        },
    },
    getters: {
        isMobile: state => state.width <= 991 //Abaixo de 991px de width define-se um mobile
    }
})