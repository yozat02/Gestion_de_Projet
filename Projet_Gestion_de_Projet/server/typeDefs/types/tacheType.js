const { gql } = require('apollo-server-express');
const tacheType = gql`
    type Tache {
        _id: ID
        name: String
        dateDebut : String
        dateFin : String
        description: String
        developpeurs: [String]
    }
    input TacheInput {
        _id : ID
        projetId: ID
        name: String
        description: String
        dateDebut : String
        dateFin : String
    }
`;

module.exports = {
    tacheType
}