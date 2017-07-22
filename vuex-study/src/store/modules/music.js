import * as types from "../mutation-types";

const state = {
    list: []
}

const getters = {
    musiclist: state => state.list
}

const actions = {
    addMusic({commit, state}, name){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit({type: types.ADDMUSICITEM, name: name});
                resolve("添加成功！");
            }, 300)
        })
    }
}

const mutations = {
    [types.ADDMUSICITEM](state, payload){
        state.list.push(payload.name);
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}