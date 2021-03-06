const { gql } = require('apollo-server-express');
const tacheType = gql`
    type Tache {
        _id: ID
        name: String
        dateDebut : String
        dateFin : String
        description: String
        developpeurs: [String]
        status : String
        parent : String
        projetName : String
    }
    input TacheInput {
        tacheId : ID
        projetId: ID
        reunionId : ID
        name: String
        description: String
        dateDebut : String
        dateFin : String
        status : String
        parent : String
    }
`;

module.exports = {
    tacheType
}