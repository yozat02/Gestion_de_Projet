const { gql } = require('apollo-server-express');
const projetType = gql`
    type Projet {
        _id: ID
        name: String
        description: String
        taches: [Tache]
        reunion :[Reunion]
        developpeurs: [String]
    }
    input ProjetInput {
        projetId: ID
        name: String
        description: String
    }
`;

module.exports = {
    projetType
}