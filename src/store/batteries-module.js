import PouchDB from 'pouchdb';
import FindPlugin from 'pouchdb-find';
PouchDB.plugin(FindPlugin);

const state = {
    filterValues: {},
    index: null,
    currentFilters: {
        type: [],
    },
    currentList: [],
    currentListPortioned: [],
    currentPortionStart: 0,
};

const pageSize = 20;


async function populateDatabase(items) {
    const db = new PouchDB('batteries');
    if (!items.length) {
        return db;
    }
    try {
        await db.get(items[0].slug);
        return db;
    } catch(err) {}
    // populate db
    items.forEach(item => {
        const doc = item;
        doc['_id'] = item.slug;
        db.put(doc);
    });
    return db;
}

function queryFromValues(filterName, values) {
    const query = {};
    if (!values || !values.length) {
        return query;
    }
    query[filterName] = {
        $in: values,
    };
    return query;
}

function singleFieldQueryArray(currentFilters, filterName) {
    return queryFromValues(filterName, currentFilters[filterName]);
}

function buildDbQuery(currentFilters) {
    return {
        selector: {
            ...singleFieldQueryArray(currentFilters, 'type'),
        }
    };
}

const getters = {
    getCurrentFiltersCopy(state) {
        return JSON.parse(JSON.stringify(state.currentFilters));
    },
    hasMorePortionedItems(state) {
        return state.currentListPortioned.length < state.currentList.length;
    },
    isIndexLoaded(state) {
        return Boolean(state.index);
    }
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
        state.currentListPortioned = items.slice(0, pageSize);
    },
    setCurrentPortionStart(state, startIndex) {
        state.currentPortionStart = startIndex;
        state.currentListPortioned.push(...state.currentList.slice(startIndex, startIndex + pageSize));
    },
    incrementCurrentPortionStart(state) {
        state.currentPortionStart = state.currentPortionStart + pageSize;
        state.currentListPortioned.push(...state.currentList.slice(state.currentPortionStart, state.currentPortionStart + pageSize));
    },
};


const actions = {
    async fetchIndex({ commit, state }) {
        if (state.index && dbName === state.currentDbName) {
            return;
        }
        const result = await fetch(`/statics/batteries/index.json`);
        const data = await result.json();
        const items = data.items || [];
        const filterValues = data.filters || {};
        await populateDatabase(items);
        commit('setIndex', items);
        commit('setCurrentList', items);
        commit('setFilterValues', filterValues);
    },
    async fetchReview({ commit }, slug) {
        const result = await fetch(`/statics/batteries/items/${slug}.json`);
        return await result.json();
    },
    async applyCurrentFilters({ commit, state }, currentFilters) {
        commit('setCurrentFilters', currentFilters);
        const db = new PouchDB('batteries');
        const query = buildDbQuery(currentFilters);
        const found = await db.find(query);
        commit('setCurrentList', found.docs);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}