# SYNOPSIS

[![NPM Package](https://img.shields.io/npm/v/srlp.svg?style=flat-square)](https://www.npmjs.org/package/srlp)
[![Build Status](https://img.shields.io/travis/sophonjs/srlp.svg?branch=master&style=flat-square)](https://travis-ci.org/sophonjs/srlp)
[![Coverage Status](https://img.shields.io/coveralls/sophonjs/srlp.svg?style=flat-square)](https://coveralls.io/r/sophonjs/srlp)
[![Gitter](https://img.shields.io/gitter/room/sophon/sophonjs-lib.svg?style=flat-square)](https://gitter.im/sophon/sophonjs-lib) or #sophonjs on freenode

[Recursive Length](https://octonion.institute/susy-go/wiki/wiki/SRLP) Prefix Encoding for node.js.

## INSTALL

`npm install srlp`

install with `-g` if you want to use the cli.

## USAGE

```javascript
var SRLP = require('srlp')
var assert = require('assert')

var nestedList = [[], [[]], [[], [[]]]]
var encoded = SRLP.encode(nestedList)
var decoded = SRLP.decode(encoded)
assert.deepEqual(nestedList, decoded)
```

## API

`srlp.encode(plain)` - SRLP encodes an `Array`, `Buffer` or `String` and returns a `Buffer`.

`srlp.decode(encoded, [skipRemainderCheck=false])` - Decodes an SRLP encoded `Buffer`, `Array` or `String` and returns a `Buffer` or an `Array` of `Buffers`. If `skipRemainderCheck` is enabled, `srlp` will just decode the first srlp sequence in the buffer. By default, it would throw an error if there are more bytes in Buffer than used by srlp sequence.

## CLI

`srlp decode <hex string>`  
`srlp encode <json String>`

## TESTS

Test uses mocha. To run tests and linting: `npm test`. To auto fix linting problems use: `npm run test:fix`.

## CODE COVERAGE

Install dev dependencies
`npm install`

Run
`npm run coverage`

The results are at
`coverage/lcov-report/index.html`
