let Metadata = require('../models/metadata-model.js');

exports.create = function (req, res) {
    // Create and Save a new Metadata
    if (!req.body.objId || !req.body.tag || !req.body.value) {
        res.status(400).send({
            message: "Metadata was malformed"
        });
    } else {

        let metadata = new Metadata({
            objId: req.body.objId,
            tag: req.body.tag,
            value: req.body.value
        });

        metadata.save(function (err, data) {
            //console.log(data);
            if (err) {
                //console.log(err);
                res.status(500).send({
                    message: "Some error occured while creating the Metadata."
                });
            } else {
                res.send(data);
            }
        });
    }
};

exports.findAll = function (req, res) {
    // Retrieve and return all metadata from the database.
    let match = req.query.match;
    if (match) {
        Metadata.find(match, function (err, metadata) {
            if (err) {
                res.status(500).send({
                    message: "Some error ocuured while retrieving metadata (" + match + ")"
                });
            } else {
                res.send(metadata);
            }
        })
    } else {
        Metadata.find(function (err, metadata) {
            if (err) {
                res.status(500).send({
                    message: "Some error ocuured while retrieving metadata."
                });
            } else {
                res.send(metadata);
            }
        });
    }
};

exports.findOne = function (req, res) {
    // Find a single metadata with a metadataId
    // console.log(req.params.metadataId);

    //MyModel.find({ name: 'john', age: { $gte: 18 }});

    //console.log('FindOne ', req.params.metadataId);
    Metadata.find({objId: req.params.metadataId}, function (err, metadata) {

        //console.log();
        if (err || !metadata) {
            res.status(500).send({
                message: "Could not retrieve metadata with id " + req.params.metadataId
            });
        } else {
            res.send(metadata);
        }
    });
};

exports.findMatch = function (req, res) {
    // Find a single metadata with a metadataId
    //console.log('FindMatch ', req.params.metadataId);
    Metadata.find({objId: req.params.objId}, function (err, metadata) {

        //console.log();
        if (err || !metadata) {
            res.status(500).send({
                message: "Could not retrieve metadata with id " + req.params.metadataId
            });
        } else {
            //console.log(metadata)
            res.send(metadata);
        }
    });
};

exports.update = function (req, res) {
    //console.log(req.params.metadataId)
    // Update a metadata identified by the metadataId in the request
    Metadata.findById(req.params.metadataId, function (err, metadata) {
        if (err || !metadata) {
            res.status(500).send({
                message: "Could not find a metadata with id " + req.params.metadataId
            });
        } else {
            metadata.objId = req.body.objId;
            metadata.tag = req.body.tag;
            metadata.value = req.body.value;
            metadata.save(function (err, data) {
                if (err) {
                    res.status(500).send({
                        message: "Could not update metadata with id " + req.params.metadataId
                    });
                } else {
                    res.send(data);
                }
            });
        }
    });
};

exports.delete = function (req, res) {
    // Delete a metadata with the specified metadataId in the request
    //console.log('deleting', req.params.metadataId);
    Metadata.deleteOne({_id: req.params.metadataId}, function (err, data) {
        //console.log(data.result.n);  // number actually removed

        if (err) {
            //console.log(err);
            res.status(500).send({
                message: "Could not delete metadata with id " + req.params.metadataId
            });
        } else {
            //console.log(data)
            if (data.ok) {
                //console.log(data, data.ok)
                res.status(200).send({
                    message: "metadata deleted successfully!"
                })
            } else {
                res.status(404).send({
                    message: "metadata not found " + req.params.metadataId
                })
            }
        }
    });
};
