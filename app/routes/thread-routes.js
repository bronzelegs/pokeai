module.exports = function (app) {

    let thread = require('../controllers/thread-controller.js');

    // Create a new tbread
    app.post('/threads', thread.create);

    // Retrieve all Threads
    app.get('/threads', thread.findAll);

    // Retrieve a single tbread with tbreadId
    app.get('/threads/:threadId', thread.findOne);

    // Update a tbread with tbreadId
    app.put('/threads/:threadId', thread.update);

    // Delete a tbread with tbreadId
    app.delete('/threads/:threadId', thread.delete);
}
