let request = require("request");
let server = require("../../server.js")
let base_url = "http://localhost:3000/threads"
let createdId = "";

describe("create", function() {
  describe("POST /threads", function() {

    it("returns status code 200", function(done) {
      request({
        url: base_url,
        method: 'POST',
        json: {
          correlator: "0",
          prev: "0",
          obj: "0",
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

  describe("PUT /threads id", function() {
    it("returns status code 200", function(done) {
      request({
        url: base_url + '/' + createdId,
        method: 'PUT',
        json: {

        correlator: "0",
        prev: "0",
        obj: "0",
        next: "0"
        }
      }, function(error, response, body) {
        console.log("PUT", body);
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe("GET /threads id", function() {
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

  describe("GET /threads {}", function() {
    let json = "{ correlator: '0'}";
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

  describe("DELETE /threads id", function() {
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
