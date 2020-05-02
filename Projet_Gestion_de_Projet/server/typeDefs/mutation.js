const { gql } = require('apollo-server-express');

const mutation = gql`
    type Mutation { 
        
        # Create
        createProjet(input: ProjetInput): Projet
        createTache(input: TacheInput): Tache
        createDeveloppeur(input: DeveloppeurInput): Developpeur

        # Update
        updateProjet(input :ProjetInput) : Projet
        updateTache(input :TacheInput) : Tache
        updateDeveloppeur(input :DeveloppeurInput) : Developpeur
        # Delete
         deleteTache(id :ID!) : Boolean
    } 
`;

module.exports = {
    mutation
}