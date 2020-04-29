const { Projet } = require("../models/Projet")
const { Developpeur } = require("../models/Developpeur")
const mongoose = require('mongoose');

const developpeursResolvers = {
    Query: {

        developpeurs: async () => await Developpeur.find(),

        developpeur: async (parent, { developpeurId }) => {
          return await Developpeur.findById(developpeurId);
         },
        developpeurByTacheId : async (parent ,{tacheId}) => {
            let developpeur = []
            
            return developpeur;
        }
    },
    // Mutation: {
    //     createDeveloppeur: async (root, { input }) => {

    //         // create developpeur
    //         const developpeur = new Developpeur({ _id: new mongoose.Types.ObjectId, name: input.name, description: input.description });
    //         const developpeurId = developpeur._id.toString()
    //         await developpeur.save();

    //         if (input.tacheId) {
    //             // add to tache in a projet
    //             let projet = await Projet.findOne({ taches: { $elemMatch: { _id: mongoose.Types.ObjectId(input.tacheId) } } });
    //             let taches = Array.from(projet.taches);
    //             let tache = taches.find(e => e._id.toString() === input.tacheId);
    //             if (!tache.developpeurs) tache['developpeurs'] = [];
    //             tache.developpeurs.push(developpeurId);
    //             await Projet.findOneAndUpdate({ taches: { $elemMatch: { _id: mongoose.Types.ObjectId(input.tacheId) } } }, { taches: taches })
    //         } else {
    //             // add to projet
    //             let projet = await Projet.findById(input.projetId);
    //             if (!projet.developpeurs) projet['developpeurs'] = [];
    //             projet.developpeurs.push(id)
    //             await projet.save();
    //         }
    //         return developpeur

    //     },
    // },
};

module.exports = {
    developpeursResolvers
}