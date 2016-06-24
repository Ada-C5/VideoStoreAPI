var request = require('request');
var base_url = "http://localhost:3000/"
var route = "customers/"

describe("Endpoints under /customers", function() {

  it('responds with a 200 status code', function (done) {
    request.get(base_url + route, function(error, response, body) {
      expect(response.statusCode).toEqual(200)
      done()
    })
  });

  it("should be json", function(done) {
  request.get(base_url + route, function(error, response, body) {
    expect(response.headers['content-type']).toContain('application/json')
    done()
  })
  });

  it("should be an array of objects", function(done) {
      request.get(base_url + route, function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

          expect(Object.keys(data[0])).toEqual([ 'id' ])

      done()
    })
  });
});

describe("Endpoints under /customers/sort/name", function() {

  it('responds with a 200 status code', function (done) {
    request.get(base_url + route + "/sort/name", function(error, response, body) {
      expect(response.statusCode).toEqual(200)
      done()
    })
  });

  it("should be json", function(done) {
  request.get(base_url + route + "/sort/name", function(error, response, body) {
    expect(response.headers['content-type']).toContain('application/json')
    done()
  })
  });

  it("should be an array of objects", function(done) {
      request.get(base_url + route + "/sort/name", function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

          expect(Object.keys(data[0])).toEqual([ 'id', 'name', 'registered_at', 'address', 'city', 'state', 'postal_code', 'phone', 'account_credit' ])

      done()
    })
  });
});

describe("Endpoints under /customers/:id/current", function() {

  it('responds with a 200 status code', function (done) {
    request.get(base_url + route + "/5/current", function(error, response, body) {
      expect(response.statusCode).toEqual(200)
      done()
    })
  });

  it("should be json", function(done) {
  request.get(base_url + route + "/5/current", function(error, response, body) {
    expect(response.headers['content-type']).toContain('application/json')
    done()
  })
  });

  it("should be an array of objects", function(done) {
      request.get(base_url + route + "/5/current", function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

          expect(Object.keys(data[0])).toEqual([ 'id', 'movie_id', 'customer_id', 'created_date', 'due_date', 'returned', 'returned_date' ])

      done()
    })
  });
});

describe("Endpoints under /customers/:id/history", function() {

  it('responds with a 200 status code', function (done) {
    request.get(base_url + route + "/5/history", function(error, response, body) {
      expect(response.statusCode).toEqual(200)
      done()
    })
  });

  it("should be json", function(done) {
  request.get(base_url + route + "/5/history", function(error, response, body) {
    expect(response.headers['content-type']).toContain('application/json')
    done()
  })
  });

  it("should be an array of objects", function(done) {
      request.get(base_url + route + "/5/history", function(error, response, body) {
        var data = JSON.parse(body)
        expect(typeof data).toEqual('object')

          expect(Object.keys(data[0])).toEqual([ 'customer_id', 'created_date', 'movie_id', 'returned_date' ])

      done()
    })
  });
});
