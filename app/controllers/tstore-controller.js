let Triple = require('../models/tstore-model.js');

exports.create = function (req, res) {
    // Create and Save a new Triple
    if (!req.body.subj || !req.body.pred || !req.body.obj) {
        res.status(400).send({
            message: "Triple was malformed"
        });
    } else {

        let triple = new Triple({
            subj: req.body.subj,
            pred: req.body.pred,
            obj: req.body.obj
        });

        triple.save(function (err, data) {
            //console.log(data);
            if (err) {
                //console.log(err);
                res.status(500).send({
                    message: "Some error occured while creating the Triple."
                });
            } else {
                res.send(data);
            }
        });
    }
};

exports.findAll = function (req, res) {
    // Retrieve and return all triple from the database.

    let match = req.query.match;
    if (match) {
        Triple.find(match, function (err, triples) {
            if (err) {
                res.status(500).send({
                    message: "Some error ocuured while retrieving triples (" + match + ")"
                });
            } else {
                res.send(triples);
            }
        })
    } else {

        Triple.find(function (err, triples) {
            if (err) {
                res.status(500).send({
                    message: "Some error ocuured while retrieving triples."
                });
            } else {
                res.send(triples);
            }
        });
    }
};

exports.findOne = function (req, res) {
    // Find a single triple with a tripleId
    // console.log(req.params.tripleId);
    Triple.findById(req.params.tripleId, function (err, triple) {
        //console.log();
        if (err || !triple) {
            res.status(500).send({
                message: "Could not retrieve triple with id " + req.params.tripleId
            });
        } else {
            res.send(triple);
        }
    });
};

exports.update = function (req, res) {
    //console.log(req.params.tripleId)
    // Update a triple identified by the tripleId in the request
    Triple.findById(req.params.tripleId, function (err, triple) {
        if (err || !triple) {
            res.status(500).send({
                message: "Could not find a triple with id " + req.params.tripleId
            });
        } else {

            triple.subj = req.body.subj;
            triple.pred = req.body.pred;
            triple.obj = req.body.obj;

            triple.save(function (err, data) {
                if (err) {
                    res.status(500).send({
                        message: "Could not update triple with id " + req.params.tripleId
                    });
                } else {
                    res.send(data);
                }
            });
        }
    });
};

exports.delete = function (req, res) {
    // Delete a triple with the specified tripleId in the request
    //console.log('deleting', req.params.tripleId);
    Triple.deleteOne({_id:req.params.tripleId}, function (err, data) {
        //console.log(data.result.n);  // number actually removed

        if (err) {
            //console.log(err);
            res.status(500).send({
                message: "Could not delete triple with id " + req.params.tripleId
            });
        } else {
            //console.log(data)
            if (data.ok) {
                res.status(200).send({
                    message: "triple deleted successfully!"
                })
            } else {
                res.status(404).send({
                    message: "triple not found " + req.params.tripleId
                })
            }
        }
    });
};
