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
                }
            let projet = await Projet.findById(input.projetId);
            if (!projet.reunions) projet['reunions'] = [];
            projet.reunions.push(reunion);
            await projet.save();
            return reunion;
        },
    },
}

module.exports = {
    reunionsResolvers
}