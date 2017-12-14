const getManifest = require('level-manifest');
const promisifyDBMethod = require('./promisify-db-method');
const hasOwnProperty = Object.hasOwnProperty;

/*
 * Provide a levelDB and have all of it's async methods augmented with
 * a Promise API.
 */
function wrapDB(db) {

  // Get a list & description of the methods available on the databas instance.
  const { methods } = getManifest(db);

  for (let methodName in methods) {
    if (hasOwnProperty.call(methods, methodName)) {
      const method = methods[methodName];
      if (method.type === 'async') {
        promisifyDBMethod(db, methodName, method);
      }
    }
  }

  // Handle basic DB methods
  ['open', 'close'].forEach((methodName) => {
    if (!methods[methodName] && typeof db[methodName] === 'function') {
      promisifyDBMethod(db, methodName, db[methodName]);
    }
  });

  return db;
}

module.exports = wrapDB;
