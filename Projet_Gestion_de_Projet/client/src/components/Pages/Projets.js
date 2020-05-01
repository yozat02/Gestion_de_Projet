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
    dateDebut
    dateFin
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
      dateDebut
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
  const  columns= [
    { title: 'Nom', field: 'name' },
    { title: 'Description', field: 'description' },
    { title: 'Date de debut', field: 'dateDebut' },
    { title: 'Date de fin', field: 'dateFin'}
    
  ]
  let { loading, error, data } = useQuery(TACHES,{ variables: {portfolioId: match.params.id},});
  const [addTache] = useMutation(ADD_TACHE);
  const [deleteTache] =useMutation(DELETE_TACHE);
  const addItem = (name,description,dateDebut,dateFin) => {
    addTache({
      variables: {
          input: {"projetId":match.params.id,"name": name ,"description" :description,"dateDebut":dateDebut,"dateFin":dateFin },
          refetchQueries: [{ query: TACHES }],
      }
     });
    }
  const deleteItem = (item) => {
    console.log(item)
    deleteTache({
      variables: {
          id: item._id,
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
        <TreeTable 
          title={"Liste des taches"} 
          columns={columns} 
          tableData={array} 
          addItem={addItem} 
          deleteItem={deleteItem}
          />
      </div>
    
  );
};

export default CheckupsProjetsPage ;
