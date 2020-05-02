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

const DEVELOPPEURS = gql`
query developpeurByTacheId($tacheId: ID!) {
  tache(tacheId: $tacheId){
    name 
    description
    dateDebut
    dateFin
  }
  developpeurByTacheId(tacheId: $tacheId) {
    _id
    name 
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
  ]
 
  let { loading, error, data } = useQuery(DEVELOPPEURS,{ variables: {tacheId: match.params.id},});
  const [addDev] = useMutation(ADD_DEVELOPPEUR);
  const [updateDeveloppeur] = useMutation(UPDATE_DEVELOPPEUR);

  const addItem = (name) => {
    addDev({
      variables: {
          input: {"tacheId":match.params.id,"name": name },
          refetchQueries: [{ query: DEVELOPPEURS }],
      }
     });
  }
  const updateItem = (item) => {
    updateDeveloppeur({
      variables: {
        input: {"developpeurId":item._id,"name": item.name},
          refetchQueries: [{ query: DEVELOPPEURS}],
      }
     });
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
          rowClick={false}
          />
      </div>
    
  );
};

export default CheckupsTachesPage ;