module.exports = function (app) {

    let metadata = require('../controllers/metadata-controller.js');

    // Create a new metadata
    app.post('/metadata', metadata.create);

    // Retrieve all Triples
    app.get('/metadata', metadata.findAll);

    // Retrieve a single metadata with metadataId
    app.get('/metadata/:metadataId', metadata.findOne);

    // Retrieve a all metadata for objId
    app.get('/metadata', metadata.findMatch);

    // Update a metadata with metadataId
    app.put('/metadata/:metadataId', metadata.update);

    // Delete a metadata with metadataId
    app.delete('/metadata/:metadataId', metadata.delete);
}
