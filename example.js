const level = require('level');
const db = level('./mydb');
const wrapDB = require('./index');
const wrapped = wrapDB(db);

async function main() {
  await wrapped.put('foo', 'bar');
  const value = await wrapped.get('foo');
  console.error(value);
}

main();
