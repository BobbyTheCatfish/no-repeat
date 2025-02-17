<div align="center">
    <h1>No-Repeat</h1>
    <p>Random Results Without Repetition</p>
</div>

A utility class for randomly selecting items from an array without repetition.
It ensures that each item is only picked once before resetting, while preventing the most recent item from being selected consecutively.

Ideal for scenarios that require randomized selection without repetition.

Written in TypeScript with no dependencies.

## Installation
```bash
npm install --save no-repeat@npm:@bobbythecatfish/no-repeat
```

## Usage
```js
const NoRepeat = require("no-repeat");

// load data into NoRepeats
// strings are used for these demos, but it works with any variable type
const intros = new NoRepeat(data.intros);
const names = new NoRepeat(data.names);
const excuses = new NoRepeat(data.excuses);

function makeExcuse() {
    // generate a randomized and unique output
    return `<${intros.getRandom()}> <${names.getRandom()}> <${excuses.getRandom()}>!`;
}
// example output 1: "<It's been great talking to you, but> <Bobby> <is trying to tag me>!"
// example output 2: "<Look. I'll be completely honest with you.> <A snail> <has been perfecting its taco recipe and I gotta try it>!"
```

## Advanced Usage
Reset-Delayed Options
```js
const NoRepeat = require("no-repeat");

const firstSet = ["Tom", "David", "Bobby"];
const secondSet = ["Larry", "Terry", "Jerry"];

// Tom, David, and Bobby will be the only possible responses for the first 3 calls of getRandom().
const arr = new NoRepeat(firstSet, undefined, secondSet);
const a = arr.getRandom(); // Tom
const b = arr.getRandom(); // David
const c = arr.getRandom(); // Bobby
// At this point, arr is reset and the second set are mixed in with the first
// Bobby is not a possible result until the next reset since it was picked last
const d = arr.getRandom(); // David
const e = arr.getRandom(); // Larry
const f = arr.getRandom(); // Tom
...
```

Faster Reset
```js
const NoRepeat = require("no-repeat");

const set = ["Tom", "David", "Bobby", "Larry", "Terry", "Jerry"];

// reset after returning 4 elements instead of all 6
const arr = new NoRepeat(set, 4);

const a = arr.getRandom(); // Terry
const b = arr.getRandom(); // David
const c = arr.getRandom(); // Tom
const d = arr.getRandom(); // Jerry
// at this point, arr is reset.
// Jerry is not a possible response until the next reset.
const e = arr.getRandom(); // Larry
const f = arr.getRandom(); // Tom
// another reset just for fun.
// Since this is a complete reset, Tom *is* a possible response despite being picked last.
arr.reset();
...
```
`arr.resetAt` can be changed at any time.

Adding to items
```js
const NoRepeat = require("no-repeat");

const set = ["Tom", "David", "Bobby"];

const arr = new NoRepeat(set);
const a = arr.getRandom(); // Bobby

// add a new element into the mix
arr.items.push("Larry");

const b = arr.getRandom() // Larry
```
The same can be done with `arr.used.push()` to make it a possible selection after the next reset.