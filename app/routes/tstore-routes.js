module.exports = function (app) {

    let triples = require('../controllers/tstore-controller.js');

    // Create a new triple
    app.post('/triples', triples.create);

    // Retrieve all Triples
    app.get('/triples', triples.findAll);

    // Retrieve a single triple with tripleId
    app.get('/triples/:tripleId', triples.findOne);

    // Update a triple with tripleId
    app.put('/triples/:tripleId', triples.update);

    // Delete a triple with tripleId
    app.delete('/triples/:tripleId', triples.delete);
}
