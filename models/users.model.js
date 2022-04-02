const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    uid : { type: Number },
    uname : { type: String },
    upass : { type: String },
    uloggedin : { type: Boolean }
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;