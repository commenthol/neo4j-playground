const neo4j = require('neo4j-driver').v1

class Driver {
  /**
   * @param {String} uri
   * @param {Object} [opts]
   * @param {String} opts.user
   * @param {String} opts.passwd
   */
  constructor (uri, opts) {
    let _auth
    uri = uri || 'bolt://localhost:7687'
    const {user, passwd, ...other} = opts || {}
    if (user) {
      _auth = neo4j.auth.basic(user, passwd)
    }
    this.driver = neo4j.driver(uri, _auth, other)
  }

  run (cypherStr, data) {
    const session = this.driver.session()
    return session.run(cypherStr, data)
      .then(result => {
        session.close()
        return result.records
      })
  }

  readTransaction (cypherStr, data) {
    const session = this.driver.session()
    const rx = session.readTransaction(transaction => transaction.run(cypherStr, data))
    return rx.then(result => {
      session.close()
      return result.records
    })
  }

  writeTransaction (cypherStr, data) {
    const session = this.driver.session()
    const tx = session.writeTransaction(transaction => transaction.run(cypherStr, data))
    return tx.then(result => {
      session.close()
      return result.records
    })
  }

  close () {
    this.driver && this.driver.close()
  }
}

module.exports = Driver
