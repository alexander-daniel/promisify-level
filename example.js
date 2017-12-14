const level = require('level');
const promisifyLevelDB = require('./src/index');

async function main() {
  const db = level('./mydb');
  const promisifiedDB = promisifyLevelDB(db);

  try {

    await promisifiedDB.put('foo', 'bar');
    const value = await promisifiedDB.get('foo');
    console.error(value); // -> 'bar'

  } catch (err) {
    // handle errors here
  }
}

main();
