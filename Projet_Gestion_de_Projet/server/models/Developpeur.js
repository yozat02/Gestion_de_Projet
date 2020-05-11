const mongoose = require('mongoose');
const { Schema } = mongoose;

const developpeurSchema = new Schema({
    _id: Schema.ObjectId,
    name: String,
    mail : String
},
{
    versionKey: false
});

const Developpeur = mongoose.model('developpeurs', developpeurSchema);

module.exports = {
    Developpeur
};