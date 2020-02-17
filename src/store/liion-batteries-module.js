import PouchDB from 'pouchdb';
import FindPlugin from 'pouchdb-find';
PouchDB.plugin(FindPlugin);

const DB_NAME = 'iion-batteries';
const JSON_FILES_DIR = '/statics/liion_batteries';
const pageSize = 20;

const state = {
    filterValues: {},
    index: null,
    currentFilters: {
        type: [],
        size: [],
        year: [],
        top: [],
        prot: [],
        rated_mah: [],
    },
    currentList: [],
    currentListPortioned: [],
    currentPortionStart: 0,
    processing: false,
};

async function populateDatabase(items) {
    let db = new PouchDB(DB_NAME);
    if (!items.length) {
        return db;
    }
    try {
        await db.get(items[0].slug);
        await db.destroy();
        db = new PouchDB(DB_NAME);
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
            ...singleFieldQueryArray(currentFilters, 'size'),
            ...singleFieldQueryArray(currentFilters, 'year'),
            ...singleFieldQueryArray(currentFilters, 'top'),
            ...singleFieldQueryArray(currentFilters, 'prot'),
            ...singleFieldQueryArray(currentFilters, 'rated_mah'),
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
    },
    isListLoading(state) {
        return !Boolean(state.index) || state.processing;
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
    setProcessing(state, isProcessing) {
        state.processing = isProcessing;
    },
};


const actions = {
    async fetchIndex({ commit, state }) {
        if (state.index) {
            return;
        }
        const result = await fetch(`${JSON_FILES_DIR}/index.json`);
        const data = await result.json();
        const items = data.items || [];
        const filterValues = data.filters || {};
        await populateDatabase(items);
        commit('setIndex', items);
        commit('setCurrentList', items);
        commit('setFilterValues', filterValues);
    },
    async fetchReview({ commit }, slug) {
        const result = await fetch(`${JSON_FILES_DIR}/items/${slug}.json`);
        return await result.json();
    },
    async applyCurrentFilters({ commit, state }, currentFilters) {
        commit('setProcessing', true);
        commit('setCurrentFilters', currentFilters);
        const db = new PouchDB(DB_NAME);
        const query = buildDbQuery(currentFilters);
        const found = await db.find(query);
        commit('setCurrentList', found.docs);
        commit('setProcessing', false);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}