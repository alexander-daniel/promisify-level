## `promisify-level`
Wraps a [leveldb](https://www.npmjs.com/package/level) instance's methods with `util.promisify` and allows you to choose which API you want to use. Bring your own leveldb instance.

## installation
```bash
yarn add promisify-level
```
or
```bash
npm i --save promisify-level
```

Using node `8` which has `util.promisify` implemented. Should work with `webpack` and in the browser. Feel free to log issues

## usage

```js
const level = require('level');
const promisifyLevelDB = require('promisify-level');

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
```


## license
MIT
