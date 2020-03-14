async function insertIfNew(db, doc) {
  return db
      .put(doc)
      .catch(err => {
          if (err.status !== 409) {
              throw err;
          }
      });
}

async function upsert(db, doc) {
  return db
      .put(doc)
      .catch(() => db.get(doc._id))
      .then(existing => {
          doc._rev = existing._rev;
          return db.put(doc);
      });
}

async function hasDocuments(db) {
  const info = await db.info();
  return info.doc_count > 0;
}

async function populateDatabase(db, items) {
  items.forEach(async item => {
      await insertIfNew(db, item);
  });
}

async function getDocsFromIds(db, ids) {
  const result = [];
  for(let i=0; i<ids.length; i++) {
    const doc = await db.get(ids[i]);
    result.push(doc);
  }
  return result;
}

async function findPaginated(db, query=null, pageSize=20) {
  let idsList = [];
  if (!query) {
    const docs = await db.allDocs();
    idsList = docs.rows.map(doc => doc.id);
  } else {
    const found = await db.find({ ...query, fileds: ['_id'] });
    idsList = found.docs.map(doc => doc._id);
  }
  return {
    idsList,
    hasMorePages: idsList.length > pageSize,
    page: 0,
    pageSize,
    pageDocs: null,
  }
}

async function nextPage(db, pagination) {
  const start = pagination.page * pagination.pageSize;
  const end = start + pagination.pageSize;
  let page = pagination.page;
  let hasMorePages = false;
  let pageDocs = [];
  if (start < pagination.idsList.length) {
    const ids = pagination.idsList.slice(start, end);
    pageDocs = await getDocsFromIds(db, ids);
    hasMorePages = end < pagination.idsList.length;
    page += 1;
  }
  return {
    hasMorePages,
    page,
    pageDocs,
  }
}

export default {
  insertIfNew,
  upsert,
  hasDocuments,
  populateDatabase,
  getDocsFromIds,
  findPaginated,
  nextPage,
}
