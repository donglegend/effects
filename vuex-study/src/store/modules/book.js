import * as types from "../mutation-types";

const state = {
    list: []
}

const getters = {
    booklist: state => state.list
}

const actions = {
    addBook({commit, state}, name){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit({type: types.ADDBOOKITEM, name: name});
                resolve("添加成功！");
            }, 300)
        })
    }
}

const mutations = {
    [types.ADDBOOKITEM](state, payload){
        state.list.push(payload.name);
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}