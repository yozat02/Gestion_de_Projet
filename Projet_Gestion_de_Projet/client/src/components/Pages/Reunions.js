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
  reunion(reunionId: $portfolioId){
    name
    description
    date
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
  const  columns= [
    { title: 'Nom', field: 'name' },
    { title: 'Description', field: 'description',width: 700 },
    { title: 'Date de debut', field: 'dateDebut' },
    { title: 'Date de fin', field: 'dateFin'}
    
  ]
  let { loading, error, data } = useQuery(TACHES,{ variables: {portfolioId: match.params.id},});
  const [addTache] = useMutation(ADD_TACHE);
  const [deleteTache] =useMutation(DELETE_TACHE);
  const [updateTache] =useMutation(UPDATE_TACHE);
  const addItem = (name,description,dateDebut,dateFin) => {
    addTache({
      variables: {
          input: {"projetId":match.params.id,"name": name ,"description" :description,"dateDebut":dateDebut,"dateFin":dateFin },
          refetchQueries: [{ query: TACHES }],
      }
     });
  }
  const updateItem = (item) => {
    updateTache({
      variables: {
        input: {"tacheId":item._id,"name": item.name ,"description" :item.description,"dateDebut":item.dateDebut,"dateFin":item.dateFin },
          refetchQueries: [{ query: TACHES }],
      }
     });
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
               <h2>Description : {data.reunion.date}</h2> 
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <TreeTable 
          title={"Liste des taches"} 
          columns={columns} 
          tableData={!!data.taches ? data.taches : []} 
          addItem={addItem} 
          deleteItem={deleteItem}
          updateItem={updateItem}
          rowClick={true}
          />
      </div>
    
  );
};

export default CheckupsProjetsPage ;
