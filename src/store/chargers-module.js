const state = {
    filterValues: null,
    index: [],
    currentFilters: {},
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
    setFilterValues(state, values) {
        state.filterValues = values;
    },
    setCurrentFilters(state, values) {
        state.currentFilters = values;
    },
    setCurrentList(state, items) {
        state.currentList = items;
    }
};

const actions = {
    async fetchIndex({ commit }) {
        const result = await fetch('/statics/chargers/index.json');
        const data = await result.json();
        const items = data.items || [];
        const filterValues = data.filters || {};
        commit('setIndex', items);
        commit('setFilterValues', filterValues);
        return items;
    },
    fetchList({ commit }) {
        commit('setList', [2,3]);
    },
    async fetchReview({ commit }, slug) {
        const result = await fetch(`/statics/chargers/items/${slug}.json`);
        const data = await result.json();
        return data;
    },
    async applyCurrentFilters({ commit, state }, filterValues) {
        commit('setCurrentFilters', filterValues);
        // apply filters and assign currentList
        const currentList = [];
        commit('setCurrentList', currentList);
        console.log('apply filters', filterValues);
        return currentList;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}