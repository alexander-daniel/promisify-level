const { promisify } = require('util');

/*
 * Takes a database, a methodName and a method.
 * Replaces the method with  an augmented method to the database which maintains
 * the original callback-style API, but if the user does NOT provide a callback
 * to the method call, they get a Promisified version of that method!
 */
function promisifyDBMethod(db, methodName, method) {
  if (typeof method !== 'function') {
    return;
  }

  // Create a promise based version of the method
  const promisifiedMethod = promisify(method);

  // Returns a wrapped version of the method that decides which one to use
  // (Promise or non-promise) based on whether the user supplied a callback
  // or not.
  db[methodName] = () => {
    const lastArgument = arguments[arguments.length - 1]

    if (typeof lastArgument == 'function') {
      method.apply(this, arguments)
    }

    else {
      return promisifiedMethod.apply(this, arguments)
    }
  };
}

module.exports = promisifyDBMethod;
