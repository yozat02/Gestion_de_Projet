const { gql } = require('apollo-server-express');

const query = gql`
    type Query { 
        
        # Projets
        projets: [Projet]
       # projet(projetId: ID!): Projet

        # Taches
        taches(portfolioId: ID): [Tache]
      #  tache(tacheId: ID!): Tache
        
        # Developpeurs
        developpeurs: [Developpeur]
      #  developpeur(developpeurId: String!): Developpeur
    } 
`;

module.exports = {
    query
}