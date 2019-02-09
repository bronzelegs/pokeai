let Correlator = require('../models/correlator-model.js');

let versionString = "0.0.1";

exports.create = function (req, res) {
    // Create and Save a new Correlator
    if (!req.body.obj) {
        res.status(400).send({
            message: "Correlator was malformed"
        });
    } else {

        let correlator = new Correlator({
            prev: req.body.prev,
            obj: req.body.obj,
            next: req.body.next,
            version: versionString
        });

        correlator.save(function (err, data) {
            //console.log(data);
            if (err) {
                // console.log(err);
                res.status(500).send({
                    message: "Some error occured while creating the Correlator."
                });
            } else {
                res.send(data);
            }
        });
    }
};

exports.findAll = function (req, res) {
    // Retrieve and return all correlator from the database.

    let match = req.query.match;
    if (match) {
        Metadata.find(match, function (err, correlator) {
            if (err) {
                res.status(500).send({
                    message: "Some error ocuured while retrieving correlator (" + match + ")"
                });
            } else {
                res.send(correlators);
            }
        })
    } else {
        Correlator.find(function (err, correlators) {
            if (err) {
                res.status(500).send({
                    message: "Some error ocuured while retrieving correlators."
                });
            } else {
                res.send(correlators);
            }
        });
    }
};

exports.findOne = function (req, res) {
    // Find a single correlator with a correlatorId
    // console.log(req.params.correlatorId);
    Correlator.findById(req.params.correlatorId, function (err, correlator) {
        //console.log();
        if (err || !correlator) {
            res.status(500).send({
                message: "Could not retrieve correlator with id " + req.params.correlatorId
            });
        } else {
            res.send(correlator);
        }
    });
};

exports.update = function (req, res) {
    //console.log(req.params.correlatorId)
    // Update a correlator identified by the correlatorId in the request
    Correlator.findById(req.params.correlatorId, function (err, correlator) {
        if (err || !correlator) {
            res.status(500).send({
                message: "Could not find a correlator with id " + req.params.correlatorId
            });
        } else {

            correlator.correlator = req.body.correlator;
            correlator.prev = req.body.prev;
            correlator.obj = req.body.obj;
            correlator.next = req.body.next;
            correlator.versionString = req.body.next;


            correlator.save(function (err, data) {
                if (err) {
                    res.status(500).send({
                        message: "Could not update correlator with id " + req.params.correlatorId
                    });
                } else {
                    res.send(data);
                }
            });
        }
    });
};

exports.delete = function (req, res) {
    // Delete a correlator with the specified correlatorId in the request
    //console.log('deleting', req.params.correlatorId);
    Correlator.deleteOne({_id: req.params.correlatorId}, function (err, data) {
        //console.log(data.result.n);  // number actually removed

        if (err) {
            res.status(500).send({
                message: "Could not delete correlator with id " + req.params.id
            });
        } else {
            //console.log(data)
            if (data.ok) {
                res.status(200).send({
                    message: "correlator deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: "correlator not found "
                });
            }
        }
    });
};
