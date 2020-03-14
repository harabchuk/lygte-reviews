import PouchDB from 'pouchdb';
import storageCommon from './common';

const DB_NAME = 'iion-batteries';
const JSON_FILES_DIR = '/statics/liion_batteries';
const PAGE_SIZE = 20;

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

    processing: false,
    currentList: [],
    indexLoaded: false,

    pagination: {
        idsList: [],
        hasMorePages: true,
        page: 0,
        pageSize: PAGE_SIZE,
        pageDocs: null,
    }
};

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
            year: { $gt: 2000 },
            ...singleFieldQueryArray(currentFilters, 'type'),
            ...singleFieldQueryArray(currentFilters, 'size'),
            ...singleFieldQueryArray(currentFilters, 'year'),
            ...singleFieldQueryArray(currentFilters, 'top'),
            ...singleFieldQueryArray(currentFilters, 'prot'),
            ...singleFieldQueryArray(currentFilters, 'rated_mah'),
        },
        sort: [{year: 'desc'}],
    };
}

const getters = {
  getCurrentFiltersCopy(state) {
    return JSON.parse(JSON.stringify(state.currentFilters));
  },
  hasMorePortionedItems(state) {
    return state.pagination.hasMorePages;
  },
};

const mutations = {
  setFilterValues(state, values) {
    state.filterValues = values;
  },
  setCurrentFilters(state, values) {
      state.currentFilters = values;
  },
  setCurrentList(state, items) {
      state.currentList = items;
  },
  appendCurrentList(state, items) {
      state.currentList.push(...items);
  },
  setProcessing(state, isProcessing) {
      state.processing = isProcessing;
  },
  setPagination(state, pagination) {
      state.pagination = pagination;
  },
  setPaginationNextPage(state, nextPage) {
      state.pagination.pageDocs = nextPage.pageDocs;
      state.pagination.page = nextPage.page;
      state.pagination.hasMorePages = nextPage.hasMorePages;
  },
  setIndexLoaded(state, isLoaded) {
    state.indexLoaded = isLoaded;
  }
};


const actions = {
  async fetchIndex({ commit, state }) {
    if (state.indexLoaded) {
      return;
    }
    await storageCommon.fetchIndex(DB_NAME, commit, 'batteries', JSON_FILES_DIR, PAGE_SIZE);
  },
  async fetchNextPage({ commit, state }) {
    const db = new PouchDB(DB_NAME);
    storageCommon.fetchNextPage(db, commit, state);
  },
  async applyCurrentFilters({ commit, state }, currentFilters) {
    commit('setProcessing', true);
    commit('setCurrentFilters', currentFilters);
    const db = new PouchDB(DB_NAME);
    const query = buildDbQuery(currentFilters);
    storageCommon.runFindPaginated(db, commit, query, PAGE_SIZE);
    commit('setProcessing', false);
  },
  async fetchReview({ commit }, slug) {
    const result = await fetch(`${JSON_FILES_DIR}/items/${slug}.json`);
    return await result.json();
  },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
