let request = require("request");
let server = require("../../server.js")
let base_url = "http://localhost:3000/correlators"
//let base_url = "http://api.bronzelegs.com:5000/correlators"

describe("get a bunch", function() {
  describe("GET /correlators", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        let json = JSON.parse(body);
        expect(json);
        console.log(json);
        done();
      });
    });
  });
});
