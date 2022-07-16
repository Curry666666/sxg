import { reqGetSearchInfo } from "@/api"
const actions = {
    // params={} 默认参数
    async getSearchList({ commit }, params = {}) {
        let result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const getters = {
    goodsList(state) {
        // 加||[]是考虑到没有网络的情况下 返回一个空数组
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    }
}
const state = {
    searchList: {}
}
export default {
    actions,
    mutations,
    getters,
    state
}