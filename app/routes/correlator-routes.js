module.exports = function (app) {

    let correlator = require('../controllers/correlator-controller.js');

    // Create a new correlator
    app.post('/correlators', correlator.create);

    // Retrieve all Correlators
    app.get('/correlators', correlator.findAll);

    // Retrieve a single correlator with correlatorId
    app.get('/correlators/:correlatorId', correlator.findOne);

    // Update a correlator with correlatorId
    app.put('/correlators/:correlatorId', correlator.update);

    // Delete a correlator with correlatorId
    app.delete('/correlators/:correlatorId', correlator.delete);
}
