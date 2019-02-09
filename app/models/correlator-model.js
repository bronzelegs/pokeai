let mongoose = require('mongoose');

let CorrelatorSchema = mongoose.Schema({
    prev: String,
    obj: String,
    loc: { type: String, coordinates: [Number]},
    next: String
}, {
    timestamps: true,
    typeKey: '$type'
});

module.exports = mongoose.model('Correlator', CorrelatorSchema);

