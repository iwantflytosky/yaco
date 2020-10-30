import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)
import menu from './modules/menu'
import cate from './modules/cate'
import spec from './modules/spec'
import goods from './modules/goods'
export default new Vuex.Store({
    modules: {
       menu,
        cate,
        spec,
        goods
    }
})