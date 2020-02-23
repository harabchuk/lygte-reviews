import PouchDB from 'pouchdb';
import FindPlugin from 'pouchdb-find';
import storageCommon from './common';
PouchDB.plugin(FindPlugin);

const DB_NAME = 'chargers';
const JSON_FILES_DIR = '/statics/chargers';
const PAGE_SIZE = 20;

const state = {
    filterValues: {},
    currentFilters: {
        slots: [],
        chemistry: [],
        power: [],
        extra: [],
        year: [],
        rating: [],
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

function ratingsQueryArray(currentFilters) {
    const filterName = 'rating';
    return queryFromValues(filterName, ratingsToInt(currentFilters[filterName]));
}

function buildDbQuery(currentFilters) {
    return {
        selector: {
            ...singleFieldQueryArray(currentFilters, 'slots'),
            ...singleFieldQueryArray(currentFilters, 'chemistry'),
            ...singleFieldQueryArray(currentFilters, 'power'),
            ...singleFieldQueryArray(currentFilters, 'extra'),
            ...singleFieldQueryArray(currentFilters, 'year'),
            ...ratingsQueryArray(currentFilters),
        }
    };
}


const getters = {
    getCurrentFiltersCopy(state) {
        return JSON.parse(JSON.stringify(state.currentFilters));
    },
    getRatingOptions(state) {
        if (!state.filterValues.rating) {
            return [];
        }
        return state.filterValues.rating.map(r => ratingValueMap[r]);
    },
    getRatingsValuesMap(state) {
        return ratingValueMap;
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
        storageCommon.fetchIndex(DB_NAME, commit, 'chargers', JSON_FILES_DIR, PAGE_SIZE);
    },
    async fetchNextPage({ commit, state }) {
        const db = new PouchDB(DB_NAME);
        storageCommon.fetchNextPage(db, commit, state);
    },
    async applyCurrentFilters({ commit }, currentFilters) {
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
