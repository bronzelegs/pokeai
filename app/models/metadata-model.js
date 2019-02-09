let mongoose = require('mongoose');

let MetadataSchema = mongoose.Schema({
    objId: String,
    prev: String,
    tag: String,
    value: String,
    next: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Metadata', MetadataSchema);
