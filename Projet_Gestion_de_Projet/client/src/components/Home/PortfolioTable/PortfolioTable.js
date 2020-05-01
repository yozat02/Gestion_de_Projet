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


export const PortfolioTable = () => {
const  columns= [
  { title: 'Nom', field: 'name' },
  { title: 'Description', field: 'description' },
]
  
const { loading, error, data } = useQuery(PROJETS);
const [addProjet] = useMutation(ADD_PROJET);
  const addItem = (name,description) => {
    addProjet({
      variables: {
          input: {"name": name ,"description" :description },
          refetchQueries: [{ query: PROJETS }],
      }
  });
  }

  
  if (loading) return <p>Loading...</p>;
  

    console.log(data)
    return (
       <TreeTable tableData={data.projets} columns={columns} title={'Liste des projets'} addItem={addItem} />
    );
}


