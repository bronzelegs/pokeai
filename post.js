let request = require("request");
let base_url = "http://localhost:3000/triples"
let createdId = "";

request({
    url: base_url,
    method: 'POST',
    json: {
        subj: 'posttest',
        pred: 'test',
        obj: 'testing'
    }
}, function (error, response, body) {
    console.log('POST', body);
});
