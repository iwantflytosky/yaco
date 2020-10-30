import { reqSpecList, reqSpecTotal } from '../../util/request'
const state = {
    list: [],
    size: 2,
    total: 0,
    page: 1
}
const mutations = {
    changeList(state, arr) {
        state.list = arr
    },
    changeTotal(state, num) {
        state.total = num
    },
    changePage(state, num) {
        state.page = num
    }
}
const actions = {
    reqList(context, bool) {
        let p = bool ? {} : { size: context.state.size, page: context.state.page };
        reqSpecList(p).then(res => {
            if (res.data.code == 200) {
                let list = res.data.list ? res.data.list : [];
            if (list.length == 0 && context.state.page > 1) {
                context.commit("changePage", context.state.page - 1);
                context.dispatch("reqList");
                return;
            }
                list.forEach(item => {
                    item.attrs = JSON.parse(item.attrs)
                });
                context.commit('changeList', list);
        }})
    },
    reqTotal(context) {
        reqSpecTotal().then(res => {
            if (res.data.code == 200) {
                context.commit('changeTotal', res.data.list[0].total)
                // console.log(res);
            }
        })
    },
    changePageAction(context, page) {
        context.commit('changePage', page)
        context.dispatch('reqList')
    }
}
const getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state) {
        return state.size
    }
}
export default {
    state, mutations, actions, getters, namespaced: true
}