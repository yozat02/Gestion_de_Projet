const { Projet } = require("../models/Projet")

const projetsResolvers = {

    Query: {
        projets: () => Projet.find(),
        projet: async (root, { projetId }) => await Projet.findById(projetId),

    },
    Mutation: {
        createProjet: async (root, { input }) => await new Projet({ name: input.name, description: input.description }).save(),
        // Update Project
        updateProjet: async (obj, { input: { projetId, name, description } }) => {
            try {
                const options = { new: true };
                return await Projet.findByIdAndUpdate(projetId, { name, description }, options)
            } catch (error) {
                throw new Error(error);
            }
        },
    },

};

module.exports = {
    projetsResolvers
}