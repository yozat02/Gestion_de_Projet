const { gql } = require('apollo-server-express');
const reunionType = gql`
    type Reunion {
        _id: ID
        name: String
        description: String
        date : String
        
    }
    input ReunionInput {
        tacheId : ID
        projetId: ID
        name: String
        description: String
        date : String
    }
`;

module.exports = {
    reunionType
}