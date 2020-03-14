import PouchDB from 'pouchdb';
import dbHelpers from '../utils/pouchdb-helpers';

function timeToRefresh(name, index_version) {
  const current_seconds = (new Date()).getTime();
  const refresh_period = 24 * 60 * 60;
  const key = `last_refresh_${name}`;
  const key_version = `index_version_${name}`;
  const last_str = localStorage.getItem(key);
  const current_version = localStorage.getItem(key_version);
  if (!last_str || !current_version) {
      localStorage.setItem(key, `${current_seconds}`);
      localStorage.setItem(key_version, `${index_version}`);
      return true;
  }
  const last_seconds = parseInt(last_str);
  if (current_version !== index_version || isNaN(last_seconds) || current_seconds - last_seconds >= refresh_period) {
      localStorage.setItem(key, `${current_seconds}`);
      localStorage.setItem(key_version, `${index_version}`);
      return true;
  }
  return false;
}

async function fetchNextPage(db, commit, state) {
  commit('setProcessing', true);
  if (state.pagination.hasMorePages) {
    const nextPageResult = await dbHelpers.nextPage(db, state.pagination);
    commit('appendCurrentList', nextPageResult.pageDocs);
    commit('setPaginationNextPage', nextPageResult);
  }
  commit('setProcessing', false);
}

async function runFindPaginated(db, commit, query, pageSize) {
  const pagination = await dbHelpers.findPaginated(db, query, pageSize);
  commit('setPagination', pagination);
  const nextPageResult = await dbHelpers.nextPage(db, pagination);
  commit('setCurrentList', nextPageResult.pageDocs);
  commit('setPaginationNextPage', nextPageResult);
}

function getEmptySearchWithSort() {
  return {
    selector: {
        year: { $gt: 2000 }
    },
    sort: [{year: 'desc'}],
  };
}

async function fetchIndex(dbName, commit, storageName, jsonFilesDir, pageSize) {
  commit('setProcessing', true);
  // Load index.json and "filter values"
  const result = await fetch(`${jsonFilesDir}/index.json`);
  const data = await result.json();
  const filterValues = data.filters || {};
  commit('setFilterValues', filterValues);

  // Populate db if necessary
  let db = new PouchDB(dbName);
  const hasDocuments = await dbHelpers.hasDocuments(db);
  if (!hasDocuments || timeToRefresh(storageName, data.version)) {
      await db.destroy();
      db = new PouchDB(dbName);
      await db.bulkDocs(data.items);
      await db.createIndex({index: {fields: ['year']}});
  }

  // Fetch one page of unfiltered items
  await runFindPaginated(db, commit, getEmptySearchWithSort(), pageSize);

  commit('setIndexLoaded', true);
  commit('setProcessing', false);
}

export default {
  timeToRefresh,
  fetchNextPage,
  runFindPaginated,
  fetchIndex,
}
