const { gql } = require('apollo-server-express');

const developpeurType = gql`
    type Developpeur {
        _id: ID
        name: String
        mail: String
    }
    input DeveloppeurInput {
        developpeurId: ID
        tacheId: ID
        name: String
        mail: String
    }
`;
module.exports = {
    developpeurType
}