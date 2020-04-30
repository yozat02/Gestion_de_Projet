const { gql } = require('apollo-server-express');

const developpeurType = gql`
    type Developpeur {
        _id: ID
        name: String
    }
`;
module.exports = {
    developpeurType
}