const { Projet } = require("../models/Projet")
const { Developpeur } = require("../models/Developpeur")

const mongoose = require('mongoose');

const reunionsResolvers = {
    Query: {
        reunions: async (parent, { portfolioId }) => {
            // //Get taches by projetId
             if (portfolioId) {
                let projet = await Projet.findById(portfolioId);
                return projet.reunions;
             }
             //Get all taches
             else {
                let reunions = [];
                 let projets = await Projet.find({ reunions: { $exists: true } });
                 projets.map(projet => {
                     projet.reunions.map(reunion => reunion.push(reunion));
                 });
                return reunions;
                }
        },

        reunion: async (parent, { reunionId }) => {
           let projet = await Projet.findOne({ reunions: { $elemMatch: { _id: mongoose.Types.ObjectId(reunionId) } } });
            let reunions = Array.from(projet.reunions);
           return reunions.find(e => e._id.toString() === reunionId);
         }
    },
    Mutation: {
        createReunion: async (root, { input }) => {
            let tache = {
                 _id: new mongoose.Types.ObjectId,
                 name: input.name,
                  description: input.description,
                  dateDebut :input.dateDebut,
                  dateFin :input.dateFin
                }
            let projet = await Projet.findById(input.projetId);
            if (!projet.taches) projet['taches'] = [];
            projet.taches.push(tache);
            await projet.save();
            return tache;
        },
    },
}


module.exports = {
    reunionsResolvers
}