const assert = require('assert')
const {Driver} = require('..')
const fixtures = require('./fixtures/driver')
const config = require('./config')

describe('#Driver', function () {
  it('should connect to db', function () {
    const driver = new Driver()
    assert.equal(typeof driver.driver, 'object')
    assert.equal(typeof driver.driver._url, 'string')
    driver.close()
  })

  it('should find node Tom Hanks', function () {
    const driver = new Driver(config.uri, config.opts)
    return driver.run('MATCH (person:Person {name: {name}}) RETURN person', {name: 'Tom Hanks'})
      .then(result => {
        driver.close()
        // console.log(JSON.stringify(result, null, 2))
        const exp = fixtures['Tom Hanks']
        const res = JSON.parse(JSON.stringify(result))
        assert.deepEqual(res, exp)
      })
  })

  it('should get all movies related to Tom Hanks ', function () {
    const driver = new Driver(config.uri, config.opts)
    return driver.run('MATCH (person:Person {name: {name}})-[relatedTo]-(movies) RETURN person,movies', {name: 'Tom Hanks'})
      .then(result => {
        driver.close()
        // console.log(JSON.stringify(result, null, 2))
        const exp = fixtures['Tom Hanks Movies']
        const res = JSON.parse(JSON.stringify(result))
        assert.deepEqual(res, exp)
      })
  })

  it('should get all related movies with relation of Tom Hanks', function () {
    const driver = new Driver(config.uri, config.opts)
    return driver.run('MATCH (person:Person {name: {name}})-->(movies) RETURN person,movies', { name: 'Tom Hanks' })
      .then(result => {
        driver.close()
        // console.log(JSON.stringify(result, null, 2))
        const exp = fixtures['Tom Hanks Movie Relations']
        const res = JSON.parse(JSON.stringify(result))
        assert.deepEqual(res, exp)
      })
  })

  it('should get Person by id', function () {
    const str = 'match(person:Person) where ID(person) = {id} return person'
    const driver = new Driver(config.uri, config.opts)
    return driver.run(str, { id: 71 })
      .then(result => {
        driver.close()
        // console.log(JSON.stringify(result, null, 2))
        const exp = fixtures['Tom Hanks by Id']
        const res = JSON.parse(JSON.stringify(result))
        assert.deepEqual(res, exp)
      })
  })

})
