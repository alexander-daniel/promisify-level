const level = require('level');
const promisifyLevelDB = require('./src/index');

async function main() {
  const db = level('./mydb');
  const promisifiedDB = promisifyLevelDB(db);

  try {

    await promisifiedDB.put('foo', 'bar');
    const value = await promisifiedDB.get('foo');
    console.log(value); // -> 'bar'

  } catch (err) {
    // handle errors here
  }

  // Or be a square and use the classic callback style API
  promisifiedDB.put('fizz', 'buzz', (err) => {
    if (err) {
      // Handle it
    }

    promisifiedDB.get('fizz', (err, result) => {
      if (err) {
        // Handle it
      }

      console.log(result); // -> 'buzz'
    })
  });
}

main();
