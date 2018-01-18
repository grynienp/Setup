// @ts-check
// @flow

import ConsoleLogHTML from 'console-log-html';
import test from './test';

ConsoleLogHTML.connect(document.querySelector('#log'));

console.log('Hello from main!');
console.log(test());

// TODO: Investigate possibility of using async/await here.
Promise.all([
  import(/* webpackChunkName: "foo" */ './components/foo'),
  import(/* webpackChunkName: "bar" */ './components/bar')
])
  .then(([{ Foo }, { Bar }]) => {
    console.log(`Lazy-loaded modules: Foo: ${Foo()}, Bar: ${Bar()}`);
  })
  .catch(e => {
    console.error(e);
  });
