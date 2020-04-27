const { gql } = require('apollo-server-express');
const tacheType = gql`
    type Tache {
        _id: ID
        name: String
        description: String
        developpeurs: [String]
    }
`;

module.exports = {
    tacheType
}