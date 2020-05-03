const { gql } = require('apollo-server-express');

const query = gql`
    type Query { 
        # Projets
        projets: [Projet]
        projet(projetId: ID!): Projet

        # Taches
        taches(portfolioId: ID): [Tache]
         tache(tacheId: ID!): Tache
        
        # Developpeurs
        developpeurs: [Developpeur]
        developpeur(developpeurId: String!): Developpeur
        developpeurByTacheId(tacheId: ID!) :[Developpeur]
        #Reunions
       # reunions:(portfolioId: ID): [Reunion]
        #reunion :(reunionId: ID!): Reunion
    } 
`;

module.exports = {
    query
}