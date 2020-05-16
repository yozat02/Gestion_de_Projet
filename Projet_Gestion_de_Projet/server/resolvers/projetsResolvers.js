const { Projet } = require("../models/Projet")

const projetsResolvers = {

    Query: {
        projets: () => Projet.find(),
        projet: async (root, { projetId }) => await Projet.findById(projetId),

    },
    Mutation: {
        createProjet: async (root, { input }) => await new Projet({ name: input.name, description: input.description ,responsable :input.responsable }).save(),
        // Update Project
        updateProjet: async (obj, { input: { projetId, name, description,responsable } }) => {
            try {
                const options = { new: true };
                return await Projet.findByIdAndUpdate(projetId, { name, description,responsable }, options)
            } catch (error) {
                throw new Error(error);
            }
        },
        // delete project 
        deleteProjet: async (obj, { id }) => {
            try {
               await Projet.deleteOne({_id : id})
                return true;
            } catch (error) {
                throw new Error(error);
            }
        }
    },

};

module.exports = {
    projetsResolvers
}