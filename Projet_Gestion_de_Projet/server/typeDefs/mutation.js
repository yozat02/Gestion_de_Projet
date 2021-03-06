const { gql } = require('apollo-server-express');

const mutation = gql`
    type Mutation { 
        # Create
        createProjet(input: ProjetInput): Projet
        createTache(input: TacheInput): Tache
        createDeveloppeur(input: DeveloppeurInput): Developpeur
        createReunion(input :ReunionInput) : Reunion
        # Update
        updateProjet(input :ProjetInput) : Projet
        updateTache(input :TacheInput) : Tache
        updateDeveloppeur(input :DeveloppeurInput) : Developpeur
        updateReunion(input :ReunionInput):Reunion
        # Delete
         deleteTache(id :ID!) : Boolean
        deleteProjet(id : ID!): Boolean
        deleteDeveloppeur(id : ID!) : Boolean
        deleteReunion(id :ID!): Boolean
    } 
`;

module.exports = {
    mutation
}