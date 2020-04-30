const { Projet } = require("../models/Projet")

const projetsResolvers = {

    Query: {
        projets: () => Projet.find(),
        projet: async (root, { projetId }) => await Projet.findById(projetId),

    },
    Mutation: {
        createProjet: async (root, { input }) => await new Projet({ name: input.name, description: input.description }).save()
    },

};

module.exports = {
    projetsResolvers
}