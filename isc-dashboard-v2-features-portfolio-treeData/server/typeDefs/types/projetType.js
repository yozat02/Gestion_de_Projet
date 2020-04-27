const { gql } = require('apollo-server-express');
const projetType = gql`
    type Projet {
        _id: ID
        name: String
        description: String
        taches: [Tache]
        developpeurs: [String]
    }
    input ProjetInput {
        id: ID
        name: String
        description: String
    }
`;

module.exports = {
    projetType
}