import * as assert from 'assert'
import * as SRLP from '../src'
const BN = require('bn.js')

describe('invalid srlps', function() {
  it('should not crash on an invalid srlp', function() {
    // prettier-ignore
    const a = Buffer.from([239, 191, 189, 239, 191, 189, 239, 191, 189, 239, 191, 189, 239, 191, 189, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 239, 191, 189, 29, 239, 191, 189, 77, 239, 191, 189, 239, 191, 189, 239, 191, 189, 93, 122, 239, 191, 189, 239, 191, 189, 239, 191, 189, 103, 239, 191, 189, 239, 191, 189, 239, 191, 189, 26, 239, 191, 189, 18, 69, 27, 239, 191, 189, 239, 191, 189, 116, 19, 239, 191, 189, 239, 191, 189, 66, 239, 191, 189, 64, 212, 147, 71, 239, 191, 189, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 239, 191, 189, 11, 222, 155, 122, 54, 42, 194, 169, 239, 191, 189, 70, 239, 191, 189, 72, 239, 191, 189, 239, 191, 189, 54, 53, 239, 191, 189, 100, 73, 239, 191, 189, 55, 239, 191, 189, 239, 191, 189, 59, 1, 239, 191, 189, 109, 239, 191, 189, 239, 191, 189, 93, 239, 191, 189, 208, 128, 239, 191, 189, 239, 191, 189, 0, 239, 191, 189, 239, 191, 189, 239, 191, 189, 15, 66, 64, 239, 191, 189, 239, 191, 189, 239, 191, 189, 239, 191, 189, 4, 239, 191, 189, 79, 103, 239, 191, 189, 85, 239, 191, 189, 239, 191, 189, 239, 191, 189, 74, 239, 191, 189, 239, 191, 189, 239, 191, 189, 239, 191, 189, 54, 239, 191, 189, 239, 191, 189, 239, 191, 189, 239, 191, 189, 239, 191, 189, 83, 239, 191, 189, 14, 239, 191, 189, 239, 191, 189, 239, 191, 189, 4, 63, 239, 191, 189, 63, 239, 191, 189, 41, 239, 191, 189, 239, 191, 189, 239, 191, 189, 67, 28, 239, 191, 189, 239, 191, 189, 11, 239, 191, 189, 31, 239, 191, 189, 239, 191, 189, 104, 96, 100, 239, 191, 189, 239, 191, 189, 12, 239, 191, 189, 239, 191, 189, 206, 152, 239, 191, 189, 239, 191, 189, 31, 112, 111, 239, 191, 189, 239, 191, 189, 65, 239, 191, 189, 41, 239, 191, 189, 239, 191, 189, 53, 84, 11, 239, 191, 189, 239, 191, 189, 12, 102, 24, 12, 42, 105, 109, 239, 191, 189, 58, 239, 191, 189, 4, 239, 191, 189, 104, 82, 9, 239, 191, 189, 6, 66, 91, 43, 38, 102, 117, 239, 191, 189, 105, 239, 191, 189, 239, 191, 189, 239, 191, 189, 89, 127, 239, 191, 189, 114])
    try {
      SRLP.decode(a)
    } catch (e) {
      // FIXME: check for exception name
      assert(true)
    }
  })
})

describe('SRLP encoding (string):', function() {
  it('should return itself if single byte and less than 0x7f:', function() {
    const encodedSelf = SRLP.encode('a')
    assert.equal(encodedSelf.toString(), 'a')
    assert.equal(SRLP.getLength(encodedSelf), 1)
  })

  it('length of string 0-55 should return (0x80+len(data)) plus data', function() {
    const encodedDog = SRLP.encode('dog')
    assert.equal(4, encodedDog.length)
    assert.equal(SRLP.getLength(encodedDog), 4)
    assert.equal(encodedDog[0], 131)
    assert.equal(encodedDog[1], 100)
    assert.equal(encodedDog[2], 111)
    assert.equal(encodedDog[3], 103)
  })

  it('length of string >55 should return 0xb7+len(len(data)) plus len(data) plus data', function() {
    const encodedLongString = SRLP.encode(
      'zoo255zoo255zzzzzzzzzzzzssssssssssssssssssssssssssssssssssssssssssssss',
    )
    assert.equal(72, encodedLongString.length)
    assert.equal(SRLP.getLength(encodedLongString), 2)
    assert.equal(encodedLongString[0], 184)
    assert.equal(encodedLongString[1], 70)
    assert.equal(encodedLongString[2], 122)
    assert.equal(encodedLongString[3], 111)
    assert.equal(encodedLongString[12], 53)
  })
})

describe('SRLP encoding (list):', function() {
  it('length of list 0-55 should return (0xc0+len(data)) plus data', function() {
    const encodedArrayOfStrings = SRLP.encode(['dog', 'god', 'cat'])
    assert.equal(13, encodedArrayOfStrings.length)
    assert.equal(encodedArrayOfStrings[0], 204)
    assert.equal(encodedArrayOfStrings[1], 131)
    assert.equal(encodedArrayOfStrings[11], 97)
    assert.equal(encodedArrayOfStrings[12], 116)
  })

  // it('length of list >55 should return 0xf7+len(len(data)) plus len(data) plus data', function () {
  //   // need a test case here!
  // })
})

describe('SRLP encoding (BN):', function() {
  it('should encode a BN value', function() {
    const encodedBN = SRLP.encode(new BN(3))
    assert.equal(encodedBN[0], 3)
  })
})

describe('SRLP encoding (integer):', function() {
  it('length of int = 1, less than 0x7f, similar to string', function() {
    const encodedNumber = SRLP.encode(15)
    assert.equal(1, encodedNumber.length)
    assert.equal(encodedNumber[0], 15)
  })

  it('length of int > 55, similar to string', function() {
    const encodedNumber = SRLP.encode(1024)
    assert.equal(3, encodedNumber.length)
    assert.equal(encodedNumber[0], 130)
    assert.equal(encodedNumber[1], 4)
    assert.equal(encodedNumber[2], 0)
  })

  it('it should handle zero', function() {
    assert.equal(SRLP.encode(0).toString('hex'), '80')
  })
})

describe('SRLP decoding (string):', function() {
  it('first byte < 0x7f, return byte itself', function() {
    const decodedStr = SRLP.decode(Buffer.from([97]))
    assert.equal(1, decodedStr.length)
    assert.equal(decodedStr.toString(), 'a')
  })

  it('first byte < 0xb7, data is everything except first byte', function() {
    const decodedStr = SRLP.decode(Buffer.from([131, 100, 111, 103]))
    assert.equal(3, decodedStr.length)
    assert.equal(decodedStr.toString(), 'dog')
  })

  it('array', function() {
    // prettier-ignore
    const decodedBufferArray = SRLP.decode(Buffer.from([204, 131, 100, 111, 103, 131, 103, 111, 100, 131, 99, 97, 116]))
    assert.deepEqual(decodedBufferArray, [
      Buffer.from('dog'),
      Buffer.from('god'),
      Buffer.from('cat'),
    ])
  })
})

describe('SRLP decoding (int):', function() {
  it('first byte < 0x7f, return itself', function() {
    const decodedSmallNum = SRLP.decode(Buffer.from([15]))
    assert.equal(1, decodedSmallNum.length)
    assert.equal(decodedSmallNum[0], 15)
  })

  it('first byte < 0xb7, data is everything except first byte', function() {
    const decodedNum = SRLP.decode(Buffer.from([130, 4, 0]))
    assert.equal(2, decodedNum.length)
    assert.equal(decodedNum.toString('hex'), '0400')
  })
})

describe('strings over 55 bytes long', function() {
  const testString =
    'This function takes in a data, convert it to buffer if not, and a length for recursion'
  const testBuffer = Buffer.from(testString)
  let encoded: Buffer

  it('should encode it', function() {
    encoded = SRLP.encode(testBuffer)
    assert.equal(encoded[0], 184)
    assert.equal(encoded[1], 86)
  })

  it('should decode', function() {
    const decoded = SRLP.decode(encoded)
    assert.equal(decoded.toString(), testString)
  })
})

describe('list over 55 bytes long', function() {
  // prettier-ignore
  const testString = ['This', 'function', 'takes', 'in', 'a', 'data', 'convert', 'it', 'to', 'buffer', 'if', 'not', 'and', 'a', 'length', 'for', 'recursion', 'a1', 'a2', 'a3', 'ia4', 'a5', 'a6', 'a7', 'a8', 'ba9']
  let encoded: Buffer

  it('should encode it', function() {
    encoded = SRLP.encode(testString)
  })

  it('should decode', function() {
    const decodedBuffer = SRLP.decode(encoded)
    const decoded: string[] = []
    for (let i = 0; i < decodedBuffer.length; i++) {
      decoded[i] = decodedBuffer[i].toString()
    }
    assert.deepEqual(decoded, testString)
  })
})

describe('nested lists:', function() {
  // prettier-ignore
  const nestedList = [
    [],
    [
      []
    ],
    [
      [],
      [
        []
      ]
    ]
  ]
  const valueList = [
    [1, 2, 3],
    [
      Buffer.from([4, 5, 6]),
      Buffer.from([7, 8, 9]),
      [Buffer.from([0]), Buffer.from('abcd', 'hex')],
    ],
  ]
  let encoded: Buffer
  it('encode a nested list', function() {
    encoded = SRLP.encode(nestedList)
    assert.deepEqual(encoded, Buffer.from([0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0]))
  })

  it('should decode a nested list', function() {
    const decoded = SRLP.decode(encoded)
    assert.deepEqual(nestedList, decoded)
  })

  it('should encode a list with values', function() {
    const valueEncoded = SRLP.encode(valueList)
    // prettier-ignore
    assert.deepEqual(valueEncoded, Buffer.from([0xd2, 0xc3, 0x01, 0x02, 0x03, 0xcd, 0x83, 0x04, 0x05, 0x06, 0x83, 0x07, 0x08, 0x09, 0xc4, 0x00, 0x82, 0xab, 0xcd]))
  })
})

describe('typed lists:', function() {
  const valueList = [
    [1, 2, 3],
    [
      new Uint8Array([4, 5, 6]),
      new Uint8Array([7, 8, 9]),
      [new Uint8Array([0]), Buffer.from('abcd', 'hex')],
    ],
  ]

  // equivalent to list of values above
  it('encode a nested list', function() {
    const valueEncoded = SRLP.encode(valueList)
    // prettier-ignore
    assert.deepEqual(valueEncoded, new Buffer([0xd2, 0xc3, 0x01, 0x02, 0x03, 0xcd, 0x83, 0x04, 0x05, 0x06, 0x83, 0x07, 0x08, 0x09, 0xc4, 0x00, 0x82, 0xab, 0xcd]))
  })
})

describe('null values', function() {
  const nestedList = [null]
  let encoded
  it('encode a null array', function() {
    encoded = SRLP.encode(nestedList)
    assert.deepEqual(encoded, Buffer.from([0xc1, 0x80]))
  })

  it('should decode a null value', function() {
    assert.deepEqual(Buffer.from([]), SRLP.decode(Buffer.from('80', 'hex')))
  })
})

describe('zero values', function() {
  let encoded
  it('encode a zero', function() {
    encoded = SRLP.encode(Buffer.from([0]))
    assert.deepEqual(encoded, Buffer.from([0]))
  })

  it('decode a zero', function() {
    const decode = SRLP.decode(Buffer.from([0]))
    assert.deepEqual(decode, Buffer.from([0]))
  })
})

describe('empty values', function() {
  let decoded
  it('decode empty buffer', function() {
    decoded = SRLP.decode(Buffer.from([]))
    assert.deepEqual(decoded, Buffer.from([]))
  })
})

describe('bad values', function() {
  it('wrong encoded a zero', function() {
    const val = Buffer.from(
      'f9005f030182520894b94f5374fce5edbc8e2a8697c15331677e6ebf0b0a801ca098ff921201554726367d2be8c804a7ff89ccf285ebc57dff8ae4c44b9c19ac4aa08887321be575c8095f789dd4c743dfe42c1820f9231f98a962b210e3ac2452a3',
      'hex',
    )
    let result
    try {
      result = SRLP.decode(val)
    } catch (e) {}
    assert.equal(result, undefined)
  })

  it('invalid length', function() {
    const a = Buffer.from(
      'f86081000182520894b94f5374fce5edbc8e2a8697c15331677e6ebf0b0a801ca098ff921201554726367d2be8c804a7ff89ccf285ebc57dff8ae4c44b9c19ac4aa08887321be575c8095f789dd4c743dfe42c1820f9231f98a962b210e3ac2452a3',
      'hex',
    )

    let result
    try {
      result = SRLP.decode(a)
    } catch (e) {}
    assert.equal(result, undefined)
  })

  it('extra data at end', function() {
    const c =
      'f90260f901f9a02a3c692012a15502ba9c39f3aebb36694eed978c74b52e6c0cf210d301dbf325a01dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347948888f1f195afa192cfee860698584c030f4c9db1a0ef1552a40b7165c3cd773806b9e0c165b75356e0314bf0706f279c729f51e017a0b6c9fd1447d0b414a1f05957927746f58ef5a2ebde17db631d460eaf6a93b18da0bc37d79753ad738a6dac4921e57392f145d8887476de3f783dfa7edae9283e52b90100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008302000001832fefd8825208845509814280a00451dd53d9c09f3cfb627b51d9d80632ed801f6330ee584bffc26caac9b9249f88c7bffe5ebd94cc2ff861f85f800a82c35094095e7baea6a6c7c4c2dfeb977efac326af552d870a801ba098c3a099885a281885f487fd37550de16436e8c47874cd213531b10fe751617fa044b6b81011ce57bffcaf610bf728fb8a7237ad261ea2d937423d78eb9e137076c0ef'

    const a = Buffer.from(c, 'hex')

    let result
    try {
      result = SRLP.decode(a)
    } catch (e) {}
    assert.equal(result, undefined)
  })

  it('extra data at end', function() {
    const c =
      'f9ffffffc260f901f9a02a3c692012a15502ba9c39f3aebb36694eed978c74b52e6c0cf210d301dbf325a01dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347948888f1f195afa192cfee860698584c030f4c9db1a0ef1552a40b7165c3cd773806b9e0c165b75356e0314bf0706f279c729f51e017a0b6c9fd1447d0b414a1f05957927746f58ef5a2ebde17db631d460eaf6a93b18da0bc37d79753ad738a6dac4921e57392f145d8887476de3f783dfa7edae9283e52b90100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008302000001832fefd8825208845509814280a00451dd53d9c09f3cfb627b51d9d80632ed801f6330ee584bffc26caac9b9249f88c7bffe5ebd94cc2ff861f85f800a82c35094095e7baea6a6c7c4c2dfeb977efac326af552d870a801ba098c3a099885a281885f487fd37550de16436e8c47874cd213531b10fe751617fa044b6b81011ce57bffcaf610bf728fb8a7237ad261ea2d937423d78eb9e137076c0'

    const a = Buffer.from(c, 'hex')

    let result
    try {
      result = SRLP.decode(a)
    } catch (e) {}
    assert.equal(result, undefined)
  })

  it('list length longer than data', function() {
    const c =
      'f9ffffffc260f901f9a02a3c692012a15502ba9c39f3aebb36694eed978c74b52e6c0cf210d301dbf325a01dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347948888f1f195afa192cfee860698584c030f4c9db1a0ef1552a40b7165c3cd773806b9e0c165b75356e0314bf0706f279c729f51e017a0b6c9fd1447d0b414a1f05957927746f58ef5a2ebde17db631d460eaf6a93b18da0bc37d79753ad738a6dac4921e57392f145d8887476de3f783dfa7edae9283e52b90100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008302000001832fefd8825208845509814280a00451dd53d9c09f3cfb627b51d9d80632ed801f6330ee584bffc26caac9b9249f88c7bffe5ebd94cc2ff861f85f800a82c35094095e7baea6a6c7c4c2dfeb977efac326af552d870a801ba098c3a099885a281885f487fd37550de16436e8c47874cd213531b10fe751617fa044b6b81011ce57bffcaf610bf728fb8a7237ad261ea2d937423d78eb9e137076c0'

    const a = Buffer.from(c, 'hex')

    let result
    try {
      result = SRLP.decode(a)
    } catch (e) {}
    assert.equal(result, undefined)
  })
})

describe('hex prefix', function() {
  it('should have the same value', function() {
    const a = SRLP.encode('0x88f')
    const b = SRLP.encode('88f')
    assert.notEqual(a.toString('hex'), b.toString('hex'))
  })
})

describe('recursive typings', function() {
  it('should not throw compilation error', function() {
    type IsType<T, U> = Exclude<T, U> extends never
      ? Exclude<U, T> extends never
        ? true
        : false
      : false
    const assertType = <T, U>(isTrue: IsType<T, U>) => {
      return isTrue
    }
    // tslint:disable-next-line:no-dead-store
    const a = SRLP.encode([[[[[0]]]]])
    assert.ok(assertType<typeof a, Buffer>(true))
  })
})
