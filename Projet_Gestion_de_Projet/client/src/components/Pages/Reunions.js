import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {TreeTable} from "../Home/TreeTable/TreeTable";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Gant } from './gant'
import {Status} from './Status'
import * as emailjs from "emailjs-com";

const TACHES = gql`
query taches($portfolioId: ID!) {
  reunion(reunionId: $portfolioId){
      _id
    name
    description
    date
    parent
  }
  tacheByReunionId(reunionId:$portfolioId){
    _id
      name
      status
      developpeurs
      description
      dateDebut
      dateFin
    }
    developpeurs{
      _id
      name 
      mail
    }
}
`;
const ADD_TACHE = gql`
  mutation createTache($input: TacheInput) {
    createTache(input: $input) {
      name
      description
      dateDebut
      dateFin
    }
  }
`;
const UPDATE_TACHE = gql`
  mutation updateTache($input: TacheInput) {
    updateTache(input: $input){
      name
      dateFin
    }
  }
`;
const DELETE_TACHE = gql`
mutation deleteTache($id: ID!) {
  deleteTache(id: $id) 
}
`;


const useStyles = makeStyles((theme) => ({
  allWidth: {
    width: "100%",
    marginBottom: "20px"
  },

}));

export const CheckupsProjetsPage = ({match}) => {
  const classes = useStyles(); 
  const status = {
    open : "Open",
    inProgress: "In Progress" ,
    resolved : "Resolved"
  }
  const  columns= [
    { title: 'Nom', field: 'name' },
    { title: 'Status', field: 'status',lookup: status,render: (item) => <Status item={item} /> ,initialEditValue :"open"},
    { title: 'Description', field: 'description',width: 600 },
    { title: 'Date de debut', field: 'dateDebut',type: 'date',},
    { title: 'Date de fin', field: 'dateFin',type: 'date',}
    
  ]
  let { loading, error, data } = useQuery(TACHES,{ variables: {portfolioId: match.params.id},});
  const [addTache] = useMutation(ADD_TACHE);
  const [deleteTache] =useMutation(DELETE_TACHE);
  const [updateTache] =useMutation(UPDATE_TACHE);
  const addItem = (item) => {
    addTache({
      variables: {
          input: {"projetId":data.reunion.parent,"reunionId":match.params.id,"name": item.name ,"description" :item.description,"dateDebut":item.dateDebut,"dateFin":item.dateFin,"status":item.status,
        "parent":data.reunion.parent},
          refetchQueries: [{ query: TACHES }],
      }
     });
     window.location.reload(false) ;
  }
  const updateItem = (item,devs=data.developpeurs) => {
    updateTache({
      variables: {
        input: {"tacheId":item._id,"name": item.name ,"description" :item.description,"dateDebut":item.dateDebut,"dateFin":item.dateFin,"status":item.status },
          refetchQueries: [{ query: TACHES }],
      }
     });
    if(item.status=='inProgress' && item.developpeurs){
      const tacheDev = devs.filter(dev => item.developpeurs.includes(dev._id))
      console.log(tacheDev)
      tacheDev.map(dev =>{
        let templateParams = {
          "email":dev.mail ,
          "InProgress": "In Progress",
          "NomTache": item.name,
          "nameDev": dev.name,
          "DateBebut": item.dateDebut,
          "DateFin": item.dateFin
        };
        emailjs.send(
          "default_service",
          "status",
          templateParams,
          "user_m0dZRWFvydtF288BRlmnD"
        );
      })
    }
    if(item.status=='resolved' && item.developpeurs){
      const tacheDev = devs.filter(dev => item.developpeurs.includes(dev._id))
      console.log(tacheDev)
      tacheDev.map(dev =>{
        let templateParams = {
          "email":dev.mail ,
          "InProgress": "Resolved",
          "NomTache": item.name,
          "nameDev": dev.name,
          "DateBebut": item.dateDebut,
          "DateFin": item.dateFin
        };
        emailjs.send(
          "default_service",
          "status",
          templateParams,
          "user_m0dZRWFvydtF288BRlmnD"
        );
      })
    }
  }
  const deleteItem = (item) => {
    deleteTache({
      variables: {
          id: item._id,
          refetchQueries: [{ query: TACHES }],
      }
     });
  }

  if (loading) return <p>Loading...</p>;
  return (
    
      <div className={classes.allWidth}>
        <Card className={classes.allWidth} >
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
               <h5>Nom de la Reunion : {data.reunion.name}</h5> 
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
               <h2>Description : {data.reunion.description}</h2> 
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
               <h2>Date : {data.reunion.date}</h2> 
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <TreeTable 
          title={"Liste des taches"} 
          columns={columns} 
          tableData={!!data.tacheByReunionId ? data.tacheByReunionId : []} 
          addItem={addItem} 
          deleteItem={deleteItem}
          updateItem={updateItem}
          rowClick={true}
          />
        <Gant data={data.tacheByReunionId} />
      </div>
    
  );
};

export default CheckupsProjetsPage ;
