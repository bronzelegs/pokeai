let mongoose = require('mongoose');

let TStoreSchema = mongoose.Schema({
    subj: String,
    pred: String,
    obj: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Triple', TStoreSchema);
