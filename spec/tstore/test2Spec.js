let request = require("request");
let server = require("../../server.js")
let base_url = "http://localhost:3000/triples"
let createdId = "";

describe("create", function() {
  describe("POST /triples", function() {

    it("returns status code 200", function(done) {
      request({
        url: base_url,
        method: 'POST',
        json: {
          subj: 'posttest',
          pred: 'test',
          obj: 'testing'
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

  describe("PUT /triples id", function() {
    it("returns status code 200", function(done) {
      request({
        url: base_url + '/' + createdId,
        method: 'PUT',
        json: {
          subj: 'changed',
          pred: 'test',
          obj: 'testing'
        }
      }, function(error, response, body) {
        console.log("PUT", body);
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe("GET /triples id", function() {
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

  describe("tstore DELETE /triples id", function() {
    it("returns status code 200", function(done) {
      request({
        url: base_url + '/' + createdId,
        method: 'DELETE'
      }, function(error, response, body) {
        console.log(error, body);
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});
