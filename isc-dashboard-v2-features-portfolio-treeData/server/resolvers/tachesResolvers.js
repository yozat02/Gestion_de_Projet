const { Projet } = require("../models/Projet")
const mongoose = require('mongoose');

const tachesResolvers = {
    Query: {
        taches: async (parent, { portfolioId }) => {
            // //Get taches by projetId
             if (portfolioId) {
                let projet = await Projet.findById(portfolioId);
                return projet.taches;
             }
             //Get all taches
             else {
                let taches = [];
                 let projets = await Projet.find({ taches: { $exists: true } });
                 projets.map(projet => {
                     projet.taches.map(tache => taches.push(tache));
                 });
                return taches;
                }
        },

        tache: async (parent, { tacheId }) => {
           let projet = await Projet.findOne({ taches: { $elemMatch: { _id: mongoose.Types.ObjectId(tacheId) } } });
            let taches = Array.from(projet.taches);
           return taches.find(e => e._id.toString() === tacheId);
         }
    },
    // Mutation: {
    //     createtache: async (root, { input }) => {
    //         let tache = { _id: new mongoose.Types.ObjectId, name: input.name, description: input.description }
    //         let projet = await Projet.findById(input.projetId);
    //         if (!projet.taches) projet['taches'] = [];
    //         projet.taches.push(tache);
    //         await projet.save();
    //         return tache;
    //     },
    // },
};

module.exports = {
    tachesResolvers
}