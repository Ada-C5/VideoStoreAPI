var app = require('../app')
var db = app.get('db')

var Customer = function (customer) {
  this.id = customer.id
  this.name = customer.name
  this.registered_at = customer.registered_at
  this.address = customer.address
  this.city = customer.city
  this.state = customer.state
  this.postal_code = customer.postal_code
  this.phone = customer.phone
  this.account_credit = customer.account_credit
}

Customer.all = function (callback) {
  db.customers.find (function (error, customers) {
    if (error || !customers) {
      callback(error || new Error("Could not retrieve customers"), undefined);
    } else {
      callback(null, customers.map (function (customer) {
        return new Customer(customer);
      }))
    }
  })
}

// Customer.prototype.sortBy = function (name, registered_at, postal_code) {

// }

module.exports = Customer