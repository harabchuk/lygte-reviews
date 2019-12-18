const state = {
    filters: {
        size: null,
    },
    index: [],
    currentList: [],
};

const getters = {

};

const mutations = {
    setIndex(state, data) {
        state.index = data;
    },
    setList(state, data) {
        state.currentList = data;
    },
};

const actions = {
    async fetchIndex({ commit }) {
        const result = await fetch('/statics/chargers/index.json');
        const data = await result.json();
        const items = data.items || [];
        commit('setIndex', items);
        return items;
    },
    fetchList({ commit }) {
        commit('setList', [2,3]);
    },
    async fetchReview({ commit }, slug) {
        const result = await fetch(`/statics/chargers/items/${slug}.json`);
        console.log('result', result)
        const data = await result.json();
        return data;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}