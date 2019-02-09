let Thread = require('../models/thread-model.js');

exports.create = function (req, res) {
    // Create and Save a new Thread
    if (!req.body.obj || !req.body.correlator) {
        res.status(400).send({
            message: "Thread was malformed"
        });
    } else {

        let thread = new Thread({
            correlator: req.body.correlator,
            prev: req.body.prev,
            obj: req.body.obj,
            next: req.body.next
        });

        thread.save(function (err, data) {
            //console.log(data);
            if (err) {
                //console.log(err);
                res.status(500).send({
                    message: "Some error occured while creating the Thread."
                });
            } else {
                res.send(data);
            }
        });
    }
};

exports.findAll = function (req, res) {
    // Retrieve and return all thread from the database.

    let match = req.query.match;
    if (match) {
        Thread.find(match, function (err, thread) {
            if (err) {
                res.status(500).send({
                    message: "Some error ocuured while retrieving thread (" + match + ")"
                });
            } else {
                res.send(thread);
            }
        })
    } else {

        Thread.find(function (err, threads) {
            if (err) {
                res.status(500).send({
                    message: "Some error ocuured while retrieving threads."
                });
            } else {
                res.send(threads);
            }
        });
    }
};

exports.findOne = function (req, res) {
    // Find a single thread with a threadId
    // console.log(req.params.threadId);
    Thread.findById({_id: req.params.threadId}, function (err, thread) {
        //console.log();
        if (err || !thread) {
            res.status(500).send({
                message: "Could not retrieve thread with id " + req.params.threadId
            });
        } else {
            res.send(thread);
        }
    });
};

exports.update = function (req, res) {
    //console.log(req.params.threadId)
    // Update a thread identified by the threadId in the request
    Thread.findById(req.params.threadId, function (err, thread) {
        if (err || !thread) {
            res.status(500).send({
                message: "Could not find a thread with id " + req.params.threadId
            });
        } else {

            thread.correlator = req.body.correlator;
            thread.prev = req.body.prev;
            thread.obj = req.body.obj;
            thread.next = req.body.next;

            thread.save(function (err, data) {
                if (err) {
                    res.status(500).send({
                        message: "Could not update thread with id " + req.params.threadId
                    });
                } else {
                    res.send(data);
                }
            });
        }
    });
};

exports.delete = function (req, res) {
    // Delete a thread with the specified threadId in the request
    //console.log('deleting', req.params.threadId);
    Thread.deleteOne({_id: req.params.threadId}, function (err, data) {
        //console.log(data.result.n);  // number actually removed

        if (err) {
            res.status(500).send({
                message: "Could not delete thread with id " + req.params.threadId
            });
        } else {
            //console.log(data)
            if (data.ok) {
                res.status(200).send({
                    message: "thread deleted successfully!"
                })
            } else {
                res.status(404).send({
                    message: "thread not found "
                })
            }
        }
    });
};
