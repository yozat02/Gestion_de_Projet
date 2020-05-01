const { gql } = require('apollo-server-express');

const developpeurType = gql`
    type Developpeur {
        _id: ID
        name: String
    }
    input DeveloppeurInput {
        _id: ID
        tacheId: ID
        name: String
    }
`;
module.exports = {
    developpeurType
}