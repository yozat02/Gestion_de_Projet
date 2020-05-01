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
  developpeurByTacheId(tacheId: $tacheId) {
    _id
    name 
  }
  tache(tacheId: $tacheId){
    name 
    description
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

const useStyles = makeStyles((theme) => ({
  allWidth: {
    width: "100%",
    marginBottom: "20px"

  },
}));

const CheckupsTachesPage = ({match}) => {
  const classes = useStyles();
  console.log("match",match)
 
  let { loading, error, data } = useQuery(DEVELOPPEURS,{ variables: {tacheId: match.params.id},});
  const [addDev] = useMutation(ADD_DEVELOPPEUR);
  const addItem = (name) => {
    addDev({
      variables: {
          input: {"tacheId":match.params.id,"name": name },
          refetchQueries: [{ query: DEVELOPPEURS }],
      }
     });
    }
  let tache = data
  if (loading) return <p>Loading...</p>;
  let array = []
  if (!error) {
    array = data.developpeurByTacheId
  }

  
  return (
    
      <div className={classes.allWidth}>
        <Card className={classes.allWidth} >
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
               <h5>Nom du Tache : {tache.tache.name}</h5> 
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
               <h2>Description : {tache.tache.description}</h2> 
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <TreeTable title={"Liste des developpeurs"} tableData={array} addItem={addItem} />
      </div>
    
  );
};

export default CheckupsTachesPage ;