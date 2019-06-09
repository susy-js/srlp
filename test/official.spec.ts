import * as assert from 'assert'
import * as SRLP from '../src'
const BN = require('bn.js')

describe('offical tests', function() {
  const officalTests = require('./fixture/srlptest.json').tests

  for (const testName in officalTests) {
    it(`should pass ${testName}`, function(done) {
      let incoming = officalTests[testName].in
      // if we are testing a big number
      if (incoming[0] === '#') {
        const bn = new BN(incoming.slice(1))
        incoming = Buffer.from(bn.toArray())
      }

      const encoded = SRLP.encode(incoming)
      assert.equal('0x' + encoded.toString('hex'), officalTests[testName].out.toLowerCase())
      done()
    })
  }
})
