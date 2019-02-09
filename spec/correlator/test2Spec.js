let request = require("request");
let server = require("../../server.js")
let base_url = "http://localhost:3000/correlators"
let createdId = "";

describe("create", function() {
  describe("POST /correlators", function() {

    it("returns status code 200", function(done) {
      request({
        url: base_url,
        method: 'POST',
        json: {
          prev: "0",
          obj: "testing",
          next: "0"
        }
      }, function(error, response, body) {

        //let json= JSON.parse(body[0]);
        createdId = body._id;
        console.log('POST', body);
        //request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe("PUT /correlators id", function() {
    it("returns status code 200", function(done) {
      request({
        url: base_url + '/' + createdId,
        method: 'PUT',
        json: {
          prev: "0",
          obj: "testing",
          next: "0"
        }
      }, function(error, response, body) {
        console.log("PUT", body);
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe("GET /correlators id", function() {
    it("returns status code 200", function(done) {
      request({
        url: base_url + '/' + createdId,
        method: 'GET',

      }, function(error, response, body) {
        console.log("GET", JSON.parse(body));
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe("GET /correlator {}", function() {
    let json = "{ obj: 'testing'}";
    it("returns status code 200", function(done) {
      request({
        url: base_url  + "/",
        method: 'GET',
        data: JSON.stringify(json)
      }, function(error, response, body) {
        console.log("GET", JSON.parse(body));
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe("DELETE /correlators id", function() {
    it("returns status code 200", function(done) {
      request({
        url: base_url + '/' + createdId,
        method: 'DELETE'
      }, function(error, response, body) {
        if (error) {
          console.log("error", error);
        }
        console.log(body);
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});
