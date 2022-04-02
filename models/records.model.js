const mongoose = require('mongoose');

const recordSchema = mongoose.Schema({
    uid : { type: Number },
    rdate : { type: String },
    rfever : { type: String },
    rcold : { type: Boolean },
    rcough : { type: Boolean },
    rheight : { type: String },
    rweight : { type: String },
    rother : { type: String }
});

const Records = mongoose.model('Records', recordSchema);

module.exports = Records;