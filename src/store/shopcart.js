import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api'
const actions = {
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    async deleteCartList({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async updateCart({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    deleteAllCheckedCart({ dispatch, getters }) {
        let PromiseAll = []
        getters.cartInfoList.forEach(item => {
            let promise = item.isChecked ? dispatch('deleteCartList', item.skuId) : ''
            PromiseAll.push(promise)
        });
        return Promise.all(PromiseAll)
    },
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach((item) => {
            let promise = dispatch('updateCart', { skuId: item.skuId, isChecked })
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const getters = {
    // cartList(state) {
    //     return state.cartList[0] || {}
    // },
    cartInfoList(state) {
        return (state.cartList[0] || {}).cartInfoList || []
    }
}
const state = {
    cartList: []
}
export default {
    actions,
    mutations,
    getters,
    state
}