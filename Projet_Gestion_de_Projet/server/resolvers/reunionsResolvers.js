const { Projet } = require("../models/Projet")

const mongoose = require('mongoose');

const reunionsResolvers = {
    Query: {
        reunions: async (parent, { projetId }) => {
            // //Get reunions by projetId
             if (projetId) {
                let projet = await Projet.findById(projetId);
                return projet.reunions;
             }
             else {
                let reunions = [];
                 let projets = await Projet.find({ reunions: { $exists: true } });
                 projets.map(projet => {
                     projet.reunions.map(reunion => reunions.push(reunion));
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
            let reunion = {
                 _id: new mongoose.Types.ObjectId,
                 name: input.name,
                  description: input.description,
                  date :input.date,
                  parent :input.parent
                }
            let projet = await Projet.findById(input.projetId);
            if (!projet.reunions) projet['reunions'] = [];
            projet.reunions.push(reunion);
            await projet.save();
            return reunion;
        },
        // update Reunion
        updateReunion: async (obj, { input: { reunionId, name, description,date} }) => {
            try {
                let reunion = null;
                const filter = { reunions: { $elemMatch: { _id: mongoose.Types.ObjectId(reunionId) } } };
                const update = { $set: { 
                    "reunions.$.name": name,
                    "reunions.$.description": description,
                    "reunions.$.date": date,
                } 
                };
                const options = { new: true };
                const query = await Projet.findOneAndUpdate(filter, update, options);
                if (query && query.reunions) {
                    reunions = query.reunions.find(e => e._id.toString() === reunionId);
                }
                return reunion;
            } catch (error) {
                throw new Error(error);
            }
        },
        deleteReunion: async (obj, { id }) => {
            try {
               
                let isReunionSuccessfullyDeleted = false;
            
                const filter = { reunions: { $elemMatch: { _id: mongoose.Types.ObjectId(id) } } };
                const remove = { $pull: { reunions: { _id: mongoose.Types.ObjectId(id) } } };

                let reunion;

                const query = await Projet.findOneAndUpdate(filter, remove);
                if (query && query.reunions) {
                    isReunionSuccessfullyDeleted = true;
                    reunion = query.reunions.find(e => e._id.toString() === id);
                }
                
                return isReunionSuccessfullyDeleted
            } catch (error) {
                throw new Error(error);
            }
        }
    },
}

module.exports = {
    reunionsResolvers
}