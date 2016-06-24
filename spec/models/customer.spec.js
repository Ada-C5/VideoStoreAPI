var app = require('../../app')
var db = app.get('db')
var Customer = require('../../models/customer')

describe('Customer', function () {
  beforeEach(function(){

  })

  afterEach(function () {
    db.end()
  })


  describe('#all', function () {
    it('should return an array of objects', function(done) {
      Customer.all(function(error,customers){
        expect(customers).toEqual(jasmine.any(Array))
        done()
      })

    })

    it('should retern the right amount of customers', function(done) {
      Customer.all(function(error,customers){
        expect(customers.length).toBeGreaterThan(199)
        done()
      })
    })

  })

  describe("#sort", function(){
    it('should return an array of objects', function(done){
      Customer.sort('name',10,5,3,function(error,customers){
        expect(customers).toEqual(jasmine.any(Array))
        done()
      })
    })

    it('be a certain lenght', function(done){
      Customer.sort('name',10,5,3, function(error,customers){
        expect(customers.length).toEqual(5)
        done()
      })
    })

    it('it must sort by name', function(done){
      Customer.sort('name',10,5,3, function(error,customers){
        expect(customers[0]['id']['name']).toEqual('Acton Gilliam')
        done()
      })
    })


    it('if must be an address', function(done){
      Customer.sort('address',10,5,3, function(error,customers){
        expect(customers[0]['id']['address']).toEqual('121 Porta Ave')
        done()
      })
    })

    it('should give an error if column does not exist', function(done){
      Customer.sort('candy',10,5,3, function(error,customers){
        expect(error.message).toEqual('column "candy" does not exist')
        done()
      })
    })

  })

})
