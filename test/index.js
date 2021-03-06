var parse = require('../')
var test = require('tape')
var toArrayBuffer = require('buffer-to-arraybuffer')

var path = require('path')
var fs = require('fs')

test('should parse DDS headers', function (t) {
  var data = fs.readFileSync(path.join(__dirname, 'fixtures', 'test-dxt1.dds'))
  var array = toArrayBuffer(data)
  var result = parse(array)
  t.deepEqual(result.shape, [ 512, 512 ], 'size is correct')
  t.deepEqual(result.format, 'dxt1', 'internal format')
  t.deepEqual(typeof result.flags, 'number', 'exports some flags')
  t.deepEqual(result.images[0], { length: 131072, offset: 128, shape: [ 512, 512 ] }, 'mipmap level 0')
  t.deepEqual(result.images[1], { length: 131072 / 4, offset: 128 + 131072, shape: [ 256, 256 ] }, 'mipmap level 1')
  t.end()
})

test('should parse DDS headers', function (t) {
  var data = fs.readFileSync(path.join(__dirname, 'fixtures', 'test-dxt5.dds'))
  var array = toArrayBuffer(data)
  var result = parse(array)
  t.deepEqual(result.shape, [ 512, 512 ], 'size is correct')
  t.deepEqual(result.format, 'dxt5', 'internal format')
  t.deepEqual(typeof result.flags, 'number', 'exports some flags')
  t.deepEqual(result.images[0].shape, [ 512, 512 ])
  t.deepEqual(result.images[1].shape, [ 256, 256 ])
  t.deepEqual(result.images[2].shape, [ 128, 128 ])
  t.deepEqual(result.images[3].shape, [ 64, 64 ])
  t.end()
})
