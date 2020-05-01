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


const TACHES = gql`
query taches($portfolioId: ID!) {
    taches(portfolioId: $portfolioId) {
    _id
      name 
    description 
  }
  projet(projetId: $portfolioId){
    name
    description
  }
}
`;
const ADD_TACHE = gql`
  mutation createTache($input: TacheInput) {
    createTache(input: $input) {
      name
      description
    }
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
  let { loading, error, data } = useQuery(TACHES,{ variables: {portfolioId: match.params.id},});
  const [addTache] = useMutation(ADD_TACHE);
  const addItem = (name,description) => {
    addTache({
      variables: {
          input: {"projetId":match.params.id,"name": name ,"description" :description },
          refetchQueries: [{ query: TACHES }],
      }
     });
    }

  if (loading) return <p>Loading...</p>;

  
  let array = data.taches
  if( array==null){
    array = []
  }
  return (
    
      <div className={classes.allWidth}>
        <Card className={classes.allWidth} >
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
               <h5>Nom du Projet : {data.projet.name}</h5> 
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
               <h2>Description : {data.projet.description}</h2> 
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <TreeTable title={"Liste des taches"} tableData={array} addItem={addItem} />
      </div>
    
  );
};

export default CheckupsProjetsPage ;
