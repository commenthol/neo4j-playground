const assert = require('assert')
const {Query} = require('..')
const fixtures = require('./fixtures/query')
const config = require('./config')

describe('#Query', function () {
  let driver
  before(() => {
    driver = new Query(config.uri, config.opts)
  })
  after(() => {
    driver.close()
  })
  it('should query for Person Tom Hanks', function () {
    return driver.findLabel('Tom Hanks', {label: 'Person'})
      .then(records => {
        // console.log(JSON.stringify(records, null, 2))
        const exp = fixtures['Tom Hanks']
        const res = JSON.parse(JSON.stringify(records))
        assert.deepEqual(res, exp)
      })
  })

  it('should query for id 71', function () {
    const id = fixtures['Tom Hanks'][0].identity
    return driver.findId(id)
      .then(records => {
        // console.log(JSON.stringify(record, null, 2))
        const exp = fixtures['Tom Hanks']
        const res = JSON.parse(JSON.stringify(records))
        assert.deepEqual(res, exp)
      })
  })

  it('should query for Movie Speed Racer', function () {
    return driver.findLabel('Speed Racer', {label: 'Movie', prop: 'title'})
      .then(records => {
        // console.log(JSON.stringify(records, null, 2))
        const exp = fixtures['Speed Racer']
        const res = JSON.parse(JSON.stringify(records))
        assert.deepEqual(res, exp)
      })
  })

  it('should query for all relations of Movie Speed Racer', function () {
    // return driver.findLabelRelations('Speed Racer', { label: 'Movie', prop: 'title' })
    return driver.findLabelRelations('John Goodman')
      .then(records => {
        console.log(JSON.stringify(records, null, 2))
        // const exp = fixtures['Speed Racer']
        // const res = JSON.parse(JSON.stringify(records))
        // assert.deepEqual(res, exp)
      })
  })

})
