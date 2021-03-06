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
import * as emailjs from "emailjs-com";

const DEVELOPPEURS = gql`
query developpeurByTacheId($tacheId: ID!) {
  tache(tacheId: $tacheId){
    name 
    description
    dateDebut
    dateFin
    parent
    projetName
  }
  developpeurByTacheId(tacheId: $tacheId) {
    _id
    name 
    mail
  }
  
}
`;
const ADD_DEVELOPPEUR = gql`
  mutation createDeveloppeur($input: DeveloppeurInput) {
    createDeveloppeur(input: $input) {
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
mutation deleteDeveloppeur($id: ID!){
  deleteDeveloppeur(id: $id) 
}
`;
const useStyles = makeStyles((theme) => ({
  allWidth: {
    width: "100%",
    marginBottom: "20px"

  },
}));

const CheckupsTachesPage = ({match}) => {
  const classes = useStyles();
  const  columns= [
    { title: 'Nom', field: 'name' },
    { title: 'Mail', field: 'mail' },
  ]
  let { loading, error, data } = useQuery(DEVELOPPEURS,{ variables: {tacheId: match.params.id},});
  const [addDev] = useMutation(ADD_DEVELOPPEUR);
  const [updateDeveloppeur] = useMutation(UPDATE_DEVELOPPEUR);
  const [deleteDeveloppeur] = useMutation(DELETE_DEVELOPPEUR);

 
  const addItem = (item,tache=data.tache) => {
    addDev({
      variables: {
          input: {"tacheId":match.params.id,"name": item.name,"mail":item.mail,"tacheName":tache.name,"tacheDateDebut":tache.dateDebut,
        "tacheDateFin":tache.dateFin,"tacheStatus":"true" },
          refetchQueries: [{ query: DEVELOPPEURS }],
      }
     });
     let templateParams = {
      "email":item.mail ,
      "InProgress": "",
      "NomTache": tache.name,
      "nameDev": item.name,
      "DateBebut": tache.dateDebut,
      "DateFin": tache.dateFin,
      "projet": tache.projetName
    };
    emailjs.send(
      "default_service",
      "dev",
      templateParams,
      "user_m0dZRWFvydtF288BRlmnD"
    );
    //console.log(templateParams)
    setTimeout(function(){ window.location.reload(false) ; }, 2000);
  }
  const updateItem = (item) => {
    updateDeveloppeur({
      variables: {
        input: {"developpeurId":item._id,"name": item.name,"mail":item.mail ,"tacheStatus":"true"},
          refetchQueries: [{ query: DEVELOPPEURS}],
      }
     });
  }
  const deleteItem = (item) => {
    deleteDeveloppeur({
      variables: {
        id : item._id
      }
    })
  }
  
  if (loading) return <p>Loading...</p>;
  let array = []
  if (data) {
    array = data.developpeurByTacheId
  }
  
  return (
      <div className={classes.allWidth}>
        <Card className={classes.allWidth} >
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
               <h5>Nom du Tache : {data.tache.name}</h5> 
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
               <h2>Description : {data.tache.description}</h2> 
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
               <h2>Date de debut : {data.tache.dateDebut}</h2> 
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
               <h2>Date de fin : {data.tache.dateFin}</h2> 
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <TreeTable 
          title={"Liste des developpeurs"} 
          columns={columns} 
          tableData={array} 
          addItem={addItem} 
          updateItem={updateItem}
          deleteItem={deleteItem}
          rowClick={false}
          />
      </div>
    
  );
};

export default CheckupsTachesPage ;