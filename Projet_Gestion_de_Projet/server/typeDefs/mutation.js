const { gql } = require('apollo-server-express');

const mutation = gql`
    type Mutation { 
        
        # Create
        createProjet(input: ProjetInput): Projet
        createTache(input: TacheInput): Tache
        createDeveloppeur(input: DeveloppeurInput): Developpeur

        # Update
        
        # Delete
    } 
`;

module.exports = {
    mutation
}