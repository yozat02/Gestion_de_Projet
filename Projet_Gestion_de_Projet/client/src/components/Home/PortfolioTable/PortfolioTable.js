import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {TreeTable} from '../TreeTable/TreeTable';
import { useMutation } from '@apollo/react-hooks';


export const PROJETS = gql`
 {
  projets{
    _id
    name
    description
    responsable
  }
}
`;
const ADD_PROJET = gql`
  mutation createProjet($input: ProjetInput) {
    createProjet(input: $input) {
      name
      description
    }
  }
`;
const UPDATE_PROJET = gql`
  mutation updateProjet($input: ProjetInput) {
    updateProjet(input: $input){
      name
    }
  }
`;


export const PortfolioTable = () => {
const  columns= [
  { title: 'Nom', field: 'name' },
  { title: 'Description', field: 'description' },
  { title: 'Responsable', field: 'responsable' },
]
  
const { loading, error, data } = useQuery(PROJETS);
const [addProjet] = useMutation(ADD_PROJET);
const [updateProjet] = useMutation(UPDATE_PROJET);

  const addItem = (item) => {
    addProjet({
      variables: {
          input: {"name": item.name ,"description" :item.description ,"responsable" :item.responsable},
          refetchQueries: [{ query: PROJETS }],
      }
    
  });
  window.location.reload(false) ;
  }
  const updateItem = (item) => {
    updateProjet({
      variables: {
        input: {"projetId":item._id,"name": item.name ,"description" :item.description ,"responsable" :item.responsable},
          refetchQueries: [{ query: PROJETS }],
      }
     });
     
  }
  const deleteItem = (item) => {

  }
  
  if (loading) return <p>Loading...</p>;
  
    return (
       <TreeTable 
        tableData={data.projets}
        columns={columns} 
        title={'Liste des projets'}
        addItem={addItem}
        updateItem={updateItem} 
        deleteItem={deleteItem}
        rowClick={true}
      />
    );
}


