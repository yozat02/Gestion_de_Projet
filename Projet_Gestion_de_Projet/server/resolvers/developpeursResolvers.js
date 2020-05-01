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
            let projet = await Projet.findOne({ taches: { $elemMatch: { _id: mongoose.Types.ObjectId(tacheId) } } });
            let taches = Array.from(projet.taches);
            let tache = taches.find(e => e._id.toString() === tacheId);
            tache.developpeurs.map(dev => developpeur.push(Developpeur.findById(dev)) )
            return developpeur;
        }
    },
    Mutation: {
        createDeveloppeur: async (root, { input }) => {

            // create developpeur
            const developpeur = new Developpeur({ _id: new mongoose.Types.ObjectId, name: input.name});
            const developpeurId = developpeur._id.toString()
            await developpeur.save();

            if (input.tacheId) {
                // add to tache in a projet
                let projet = await Projet.findOne({ taches: { $elemMatch: { _id: mongoose.Types.ObjectId(input.tacheId) } } });
                let taches = Array.from(projet.taches);
                let tache = taches.find(e => e._id.toString() === input.tacheId);
                if (!tache.developpeurs) tache['developpeurs'] = [];
                tache.developpeurs.push(developpeurId);
                await Projet.findOneAndUpdate({ taches: { $elemMatch: { _id: mongoose.Types.ObjectId(input.tacheId) } } }, { taches: taches })
            }
            return developpeur

        },
    },
};

module.exports = {
    developpeursResolvers
}