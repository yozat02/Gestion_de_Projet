const mongoose = require('mongoose');
const { Schema } = mongoose;

const projetSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
    },
    name: {
        type: String,
    },
    description: {
        type: String
    },
    responsable: {
        type: String
    },
    taches: {
        type: Array,
        default: undefined
    },
    reunions: {
        type: Array,
        default: undefined
    },
    developpeurs: {
        type: Array,
        default: undefined
    }
}, {
    versionKey: false
})

const Projet = mongoose.model('projets', projetSchema);

module.exports = {
    Projet
};