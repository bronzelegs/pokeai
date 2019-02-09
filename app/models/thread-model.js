let mongoose = require('mongoose');

let ThreadSchema = mongoose.Schema({
    correlator: String,
    prev: String,
    obj: String,
    next: String,
    version: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Thread', ThreadSchema);
