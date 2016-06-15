var CustomerController = {
  sortName: function (req, res, next) {
    res.send(
      // CODE TO RETRIEVE CUSTOMERS BY NAME HERE
    ) },

  sortDate: function (req, res, next) {
    res.send(
      // CODE TO RETRIEVE CUSTOMERS BY registered_at
    ) },

  sortPostalCode: function (req, res, next) {
    res.send(
      // CODE TO RETRIEVE CUSTOMERS BY postal_code
    ) },

  current: function (req, res, next) {
    res.send(
      // CODE TO RETRIEVE currently checked out rentals by customer
    ) },

  history: function (req, res, next) {
    res.send(
      // CODE TO RETRIEVE previously checked out rentals by customer
    ) }
}

module.exports = CustomerController
