import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {TreeTable} from '../TreeTable/TreeTable';
import { useMutation } from '@apollo/react-hooks';
import * as emailjs from "emailjs-com";


export const PROJETS = gql`
 {
  projets{
    _id
    name
    description
    responsable
  }
  developpeurs{
    _id
    name 
    mail
    tacheName
    tacheDateDebut
    tacheDateFin
    tacheStatus
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
const UPDATE_DEVELOPPEUR = gql`
  mutation updateDeveloppeur($input: DeveloppeurInput) {
    updateDeveloppeur(input: $input){
      name
    }
  }
`;
const DELETE_DEVELOPPEUR = gql`
  mutation deleteProjet($id: ID!) {
    deleteProjet(id: $id)
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
const [updateDeveloppeur] = useMutation(UPDATE_DEVELOPPEUR);
const [deleteProjet] = useMutation(DELETE_DEVELOPPEUR);
//console.log(data)

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
    deleteProjet({
      variables: {
        id: item._id,
        refetchQueries: [{ query: PROJETS }],
    }
    })
  }
  //Devs
  const updateDev = (dev) => {
    updateDeveloppeur({
      variables: {
        input: {"developpeurId":dev._id,"name": dev.name,"mail":dev.mail,"tacheStatus":"false" },
         
      }
     });
     
  }
  if(data){
    //console.log(data.developpeurs)
    data.developpeurs.map(dev =>{
      let date = new Date();
      if(dev.tacheDateFin){
       // console.log(dev)
        if(new Date(dev.tacheDateFin) < date && dev.tacheStatus == "true"){
          console.log(dev)
          let templateParams = {
            "email":dev.mail ,
            "InProgress": "est terminée",
            "NomTache": dev.tacheName,
            "nameDev": dev.name,
            "DateBebut": dev.tacheDateDebut,
            "DateFin": dev.tacheDateFin
          };
          emailjs.send(
            "default_service",
            "fin_tache",
            templateParams,
            "user_m0dZRWFvydtF288BRlmnD"
          );
          updateDev(dev);
        }
      }
    })
  }

  //Devs
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


