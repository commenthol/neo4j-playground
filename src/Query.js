const Driver = require('./Driver')

const PROP = 'name'

class Query extends Driver {
  findId (id) {
    const cyp = 'MATCH (n) WHERE ID(n)={id} RETURN n'
    return this.run(cyp, { id })
      .then(records => records.map(record => record.get('n')).map(toNumber))
  }

  findLabel (query, opts) {
    let { label, prop } = opts || {}
    prop = prop || PROP
    label = label ? ':' + label : ''
    const cyp = `MATCH (n${label} {${prop}: {query}}) RETURN n`
    return this.run(cyp, {query})
      .then(records => records.map(record => record.get('n')).map(toNumber))
  }

  // 'MATCH relation=(person:Person {name: {name}})-->(movies) RETURN person,movies,relation'
  findLabelRelations (query, opts) {
    let { label, prop } = opts || {}
    prop = prop || PROP
    label = label ? ':' + label : ''
    const cyp = `MATCH r=(n${label} {${prop}: {query}})-->(m) RETURN n,m,r`
    return this.run(cyp, { query })
      .then(records => {
        console.log(records)
        return records
        // records.map(record => record.get('n')).map(toNumber)
      })
  }
}

module.exports = Query

/**
 * convert Integer to a Number
 * @param {*} record
 */
function toNumber (record) {
  ;[record, record.properties].forEach(record => {
    if (!record) return
    Object.keys(record).forEach(key => {
      const prop = record[key]
      if (prop && prop.toNumber) {
        record[key] = prop.toNumber()
      }
    })
  })
  return record
}
