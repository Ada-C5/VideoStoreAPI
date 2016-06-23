var app = require("../../app");
var db = app.get("db");
var Customer = require('../../models/customers_model')



// describe('Customer', function () {

describe('#all', function () {

  it('should return an array of customers', function (done) {
    Customer.all(function (error, data) {
      expect(typeof data).toEqual('object')
      done()
    })
  })

  // it('should return an array of customers', function (done) {
  //   Customer.all(function (error, data) {
  //     expect(typeof data).toEqual('array')
  //     done()
  //   })
  // })
})

describe('#sort', function () {

  it('should return an array of customers', function (done) {
    Customer.all(function (error, data) {
      expect(typeof data).toEqual('object')
      done()
    })
  })
})