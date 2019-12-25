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
    currentPortionStart: 0,
};

const ratingValueMap = {
    0: 'None',
    1: 'Bad',
    2: 'Useable',
    3: 'Acceptable',
    4: 'Some Good',
    5: 'Fairly Good',
    6: 'Good',
    7: 'Very Good',
};

function ratingsToInt(ratings) {
    const backMap = {};
    Object.entries(ratingValueMap).forEach(entry => {
        backMap[entry[1]] = entry[0];
    });
    return ratings.map(r => parseInt(backMap[r]));
}

function anyValueExist(values, needls) {
    return values.some(r => needls.indexOf(r) > -1);
}

function itemNotInFilter(item, filterValues, key) {
    return filterValues.hasOwnProperty(key) && filterValues[key].length && !anyValueExist(item[key], filterValues[key]); 
}

function itemNotInFilterSingle(item, filterValues, key) {
    return filterValues.hasOwnProperty(key) && filterValues[key].length && filterValues[key].indexOf(item[key])=== -1; 
}

function itemNotInFilterRating(item, filterValues) {
    const key = 'rating';
    const ratingsFilterValues = ratingsToInt(filterValues[key]);
    return filterValues.hasOwnProperty(key) && filterValues[key].length && ratingsFilterValues.indexOf(item[key])=== -1; 
}

function itemsFilterFactory(filterValues) {
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
        if (itemNotInFilterRating(item, filterValues)) {
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
    getRatingOptions(state) {
        return state.filterValues.rating.map(r => ratingValueMap[r]);
    },
    getRatingsValuesMap(state) {
        return ratingValueMap;
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
    async getCurrentListPortion({ state }, {start, count}) {
        return state.currentList.slice(start, start + count);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}