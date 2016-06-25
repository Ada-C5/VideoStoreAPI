var Customer = require("../models/customer");

var CustomersController = {

  // Retrive a list of all customers
  customerList:  function(req, res, next){
    Customer.all(function(error, customers) {
      if(error) {
        var err = new Error("Error retrieving customer list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(customers)
      }
    })
  },

  // Retrive a subset of customers (/customers/sort/name?n=10&p=2)
  customersNameSort: function(req, res, next) {
    var options = {order: 'name asc' ,limit: req.query.n, offset: req.query.p}
    Customer.nameSort(options, function(error, customers){
      if(error) {
        var err = new Error("Error retrieving customer list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(customers)
      }
    })
  },

  customersRegisteredSort:  function(req, res){
    var options = {order: 'registered_at asc', limit: req.query.n, offset: req.query.p}
    Customer.registeredSort(options, function(error, customers){
      if(error) {
        var err = new Error("Error retrieving customer list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(customers)
      }
    })
  },

  customersPostalSort:  function(req, res){
    var options = {order: 'postal_code asc', limit: req.query.n, offset: req.query.p}
    Customer.postalSort(options, function(error, customers){
      if(error) {
        var err = new Error("Error retrieving customer list:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(customers)
      }
    })
  },

  // Given a customer's id...
  // List the movies they currently have checked out (/customers/5/current)
  currentCheckOuts:  function(req, res){
    var cust_id = req.params.id
    Customer.currentrentals(cust_id, function(error, result){
      if(error) {
        var err = new Error("Error retrieving data:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(result)
      }
    })
  },

  historicalCheckOuts:  function(req, res){
    var cust_id = req.params.id
    Customer.pastRentals(cust_id, function(error, result){
      if(error) {
        var err = new Error("Error retrieving data:\n" + error.message);
        err.status = 500;
        next(err);
      } else {
        res.json(result)
      }
    })
  },
}


module.exports = CustomersController
