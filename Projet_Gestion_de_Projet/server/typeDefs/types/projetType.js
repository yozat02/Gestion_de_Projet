const { gql } = require('apollo-server-express');
const projetType = gql`
    type Projet {
        _id: ID
        name: String
        description: String
        responsable :String
        taches: [Tache]
        reunions :[Reunion]
        developpeurs: [String]
    }
    input ProjetInput {
        projetId: ID
        name: String
        description: String
        responsable : String
    }
`;

module.exports = {
    projetType
}