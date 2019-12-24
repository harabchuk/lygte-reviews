const state = {
    filterValues: {},
    index: [],
    currentFilters: {
        slots: [],
        chemistry: [],
        power: [],
        extra: [],
        year: [],
        rating: [],
    },
    currentList: [],
};

function anyValueExist(values, needls) {
    return values.some(r => needls.indexOf(r) > -1);
}

function itemNotInFilter(item, filterValues, key) {
    return filterValues.hasOwnProperty(key) && filterValues[key].length && !anyValueExist(item[key], filterValues[key]); 
}

function itemNotInFilterSingle(item, filterValues, key) {
    return filterValues.hasOwnProperty(key) && filterValues[key].length && filterValues[key].indexOf(item[key])=== -1; 
}

function itemsFilterFactory(filterValues) {
    console.log('factory', filterValues);
    return function applyFilters (item) {
        if (itemNotInFilterSingle(item, filterValues, 'slots')) {
            return false;
        }
        if (itemNotInFilter(item, filterValues, 'chemistry')) {
            return false;
        }
        if (itemNotInFilter(item, filterValues, 'power')) {
            return false;
        }
        if (itemNotInFilter(item, filterValues, 'extra')) {
            return false;
        }
        if (itemNotInFilterSingle(item, filterValues, 'rating')) {
            return false;
        }
        if (itemNotInFilterSingle(item, filterValues, 'year')) {
            return false;
        }
        return true;
    };
}

const getters = {
    getCurrentFiltersCopy(state) {
        return JSON.parse(JSON.stringify(state.currentFilters));
    },
};

const mutations = {
    setIndex(state, data) {
        state.index = data;
    },
    setFilterValues(state, values) {
        state.filterValues = values;
    },
    setCurrentFilters(state, values) {
        state.currentFilters = values;
    },
    setCurrentList(state, items) {
        state.currentList = items;
    },
};

const actions = {
    async fetchIndex({ commit }) {
        const result = await fetch('/statics/chargers/index.json');
        const data = await result.json();
        const items = data.items || [];
        const filterValues = data.filters || {};
        commit('setIndex', items);
        commit('setCurrentList', items);
        commit('setFilterValues', filterValues);
        return items;
    },
    async fetchReview({ commit }, slug) {
        const result = await fetch(`/statics/chargers/items/${slug}.json`);
        const data = await result.json();
        return data;
    },
    async applyCurrentFilters({ commit, state }, filterValues) {
        commit('setCurrentFilters', filterValues);
        const filtered = state.index.filter(itemsFilterFactory(filterValues)); 
        commit('setCurrentList', filtered);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}