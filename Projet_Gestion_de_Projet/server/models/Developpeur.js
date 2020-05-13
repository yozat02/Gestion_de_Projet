const mongoose = require('mongoose');
const { Schema } = mongoose;

const developpeurSchema = new Schema({
    _id: Schema.ObjectId,
    name: String,
    mail : String,
    tacheName:String,
    tacheDateDebut:String,
    tacheDateFin:String,
    tacheStatus:String,
},
{
    versionKey: false
});

const Developpeur = mongoose.model('developpeurs', developpeurSchema);

module.exports = {
    Developpeur
};