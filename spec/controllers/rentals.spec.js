var request = require('request');
var base_url = "http://localhost:3000/"
var route = "rentals/"


describe("Endpoints under /overdue", function() {

  it('responds with a 200 status code', function (done) {
    request.get(base_url + route + '/overdue', function(error, response, body) {
      expect(response.statusCode).toEqual(200)
      done()
    })
  });

  it("should be json", function(done) {
  request.get(base_url + route + '/overdue', function(error, response, body) {
    expect(response.headers['content-type']).toContain('application/json')
    done()
  })
  });

  it("should be an array of objects", function(done) {
      request.get(base_url + route + '/overdue', function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

        for (var record of data) {
          expect(Object.keys(record)).toEqual([ 'name', 'title', 'created_date', 'due_date' ])
        }

      done()
    })
  });
});


describe("Endpoints under /:title", function() {

  it('responds with a 200 status code', function (done) {
    request.get(base_url + route + '/Jaws', function(error, response, body) {
      expect(response.statusCode).toEqual(200)
      done()
    })
  });

  it("should be json", function(done) {
  request.get(base_url + route + '/Jaws', function(error, response, body) {
    expect(response.headers['content-type']).toContain('application/json')
    done()
  })
  });

  it("should be an array of objects", function(done) {
      request.get(base_url + route + '/Jaws', function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

          expect(Object.keys(data)).toEqual([ 'title', 'overview', 'release_date', 'total_inventory', 'available_copies' ])

      done()
    })
  });
});


describe("Endpoints under /rentals/:title/customers", function() {

  it('responds with a 200 status code', function (done) {
    request.get(base_url + route + "/Jaws/customers", function(error, response, body) {
      expect(response.statusCode).toEqual(200)
      done()
    })
  });

  it("should be json", function(done) {
  request.get(base_url + route + "/Jaws/customers", function(error, response, body) {
    expect(response.headers['content-type']).toContain('application/json')
    done()
  })
  });

  it("should be an array of objects", function(done) {
      request.get(base_url + route + "/Jaws/customers", function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

        for (var record of data) {
          expect(Object.keys(record)).toEqual([ 'id', 'name', 'registered_at', 'address', 'city', 'state', 'postal_code', 'phone', 'account_credit' ])
        }

      done()
    })
  });
});

describe("Endpoints under /rentals/:title/check-out/:customer_id", function() {

  it('responds with a 200 status code', function (done) {
    request.get(base_url + route + "/Jaws/check-out/5", function(error, response, body) {
      expect(response.statusCode).toEqual(200)
      done()
    })
  });

  it("should be json", function(done) {
  request.get(base_url + route + "/Jaws/check-out/5", function(error, response, body) {
    expect(response.headers['content-type']).toContain('application/json')
    done()
  })
  });

  it("should be an array of objects", function(done) {
      request.get(base_url + route + "/Jaws/check-out/5", function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

          expect(Object.keys(data)).toEqual([ 'id', 'movie_id', 'customer_id', 'created_date', 'due_date', 'returned', 'returned_date' ])

      done()
    })
  });
});

describe("Endpoints under /rentals/return/:id", function() {

  it('responds with a 200 status code', function (done) {
    request.get(base_url + route + "/return/5", function(error, response, body) {
      expect(response.statusCode).toEqual(200)
      done()
    })
  });

  it("should be json", function(done) {
  request.get(base_url + route + "/return/5", function(error, response, body) {
    expect(response.headers['content-type']).toContain('application/json')
    done()
  })
  });

  it("should be an array of objects", function(done) {
      request.get(base_url + route + "/return/5", function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

          expect(Object.keys(data)).toEqual([ 'id', 'movie_id', 'customer_id', 'created_date', 'due_date', 'returned', 'returned_date' ])

      done()
    })
  });
});
