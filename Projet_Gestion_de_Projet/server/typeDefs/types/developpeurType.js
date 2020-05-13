const { gql } = require('apollo-server-express');

const developpeurType = gql`
    type Developpeur {
        _id: ID
        name: String
        mail: String
        tacheName:String
        tacheDateDebut:String
        tacheDateFin:String
        tacheStatus:String
    }
    input DeveloppeurInput {
        developpeurId: ID
        tacheId: ID
        name: String
        mail: String
        tacheName:String
        tacheDateDebut:String
        tacheDateFin:String
        tacheStatus:String
    }
`;
module.exports = {
    developpeurType
}