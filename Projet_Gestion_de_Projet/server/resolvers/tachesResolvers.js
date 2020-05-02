const { Projet } = require("../models/Projet")
const { Developpeur } = require("../models/Developpeur")

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
    Mutation: {
        createTache: async (root, { input }) => {
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
        // update tache
        updateTache: async (obj, { input: { tacheId, name, description,dateDebut,dateFin} }) => {
            try {
                let tache = null;
                const filter = { taches: { $elemMatch: { _id: mongoose.Types.ObjectId(tacheId) } } };
                const update = { $set: { 
                    "taches.$.name": name,
                    "taches.$.description": description,
                    "taches.$.dateDebut": dateDebut,
                    "taches.$.dateFin": dateFin} 
                };
                const options = { new: true };
                const query = await Projet.findOneAndUpdate(filter, update, options);
                if (query && query.taches) {
                    taches = query.taches.find(e => e._id.toString() === tacheId);
                }
                return tache;
            } catch (error) {
                throw new Error(error);
            }
        },
        // delete tache
        deleteTache: async (obj, { id }) => {
            try {
                let developpeurs = [];

                let isTacheSuccessfullyDeleted = false;
                let isDeveloppeursSuccessfullyDeleted = false;
                let notFoundNestedDeveloppeurs = false;

                const filter = { taches: { $elemMatch: { _id: mongoose.Types.ObjectId(id) } } };
                const remove = { $pull: { taches: { _id: mongoose.Types.ObjectId(id) } } };

                let tache;

                const query = await Projet.findOneAndUpdate(filter, remove);
                if (query && query.taches) {
                    isTacheSuccessfullyDeleted = true;
                    tache = query.taches.find(e => e._id.toString() === id);
                    tache.developpeurs && tache.developpeurs.map(e => developpeurs.push(e));
                }
                // DELETE * Developpeurs
                if (developpeurs.length >= 1) {
                    let deleteMany = await Developpeur.deleteMany({ _id: { $in: developpeurs } });
                    if(deleteMany.deletedCount === developpeurs.length) isDeveloppeursSuccessfullyDeleted = true;
                } else {
                    notFoundNestedDeveloppeurs = true
                }

                return isTacheSuccessfullyDeleted && (isDeveloppeursSuccessfullyDeleted || notFoundNestedDeveloppeurs);
            } catch (error) {
                throw new Error(error);
            }
    },
}
};

module.exports = {
    tachesResolvers
}