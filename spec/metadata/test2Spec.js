let request = require("request");
let server = require("../../server.js")
let base_url = "http://localhost:3000/metadata"
let createdId = "";

describe("create", function () {
    describe("POST /metadata", function () {

        it("returns status code 200", function (done) {
            request({
                url: base_url,
                method: 'POST',
                json: {
                    objId: "0",
                    tag: "0",
                    value: "0"
                }
            }, function (error, response, body) {

                //let json= JSON.parse(body[0]);
                createdId = body._id;
                console.log('POST', body);
                //request.get(base_url, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe("PUT /metadata id", function () {
        it("returns status code 200", function (done) {
            request({
                url: base_url + '/' + createdId,
                method: 'PUT',
                json: {

                    correlator: "0",
                    objId: "0",
                    tag: "0",
                    value: "0"
                }
            }, function (error, response, body) {
                console.log("PUT", body);
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe("GET /metadata id", function () {
        it("returns status code 200", function (done) {
            request({
                url: base_url + '/' + createdId,
                method: 'GET',

            }, function (error, response, body) {
                console.log("GET", JSON.parse(body));
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });


    describe("GET /metadata {}", function () {
        let json = "{ correlator: '0'}";
        it("returns status code 200", function (done) {
            request({
                url: base_url + "/",
                method: 'GET',
                data: JSON.stringify(json)
            }, function (error, response, body) {
                console.log("GET", JSON.parse(body));
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe("DELETE /metadata id", function () {
        it("returns status code 200", function (done) {
            request({
                url: base_url + '/' + createdId,
                method: 'DELETE'
            }, function (error, response, body) {
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
