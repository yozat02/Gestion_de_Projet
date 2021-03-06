import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {TreeTable} from "../Home/TreeTable/TreeTable";
import {ReunionTable} from "../Home/TreeTable/ReunionTable";
import {
  Grid,
  Paper,
} from '@material-ui/core';
import Block from '../Commons/Block/Block'
import clsx from 'clsx';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Gant } from './gant'
import { ListTache } from './ListTache'

const TACHES = gql`
query taches($portfolioId: ID!) {
  projet(projetId: $portfolioId){
    name
    description
    responsable
  }
  reunions(projetId: $portfolioId) {
    _id
    name 
    description
    date
    taches
  }
  taches(portfolioId :$portfolioId){
    name
    description
    dateDebut
    dateFin
  }
}
`;
const DELETE_REUNION = gql`
mutation deleteReunion($id: ID!) {
  deleteReunion(id: $id) 
}
`;


const useStyles = makeStyles((theme) => ({
  allWidth: {
    width: "100%",
    marginBottom: "20px"
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
},
  fixedHeight: {
      height: 240,
      marginBottom: "20px",
  },

}));

export const CheckupsProjetsPage = ({match}) => {
  const classes = useStyles(); 
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  let { loading, error, data } = useQuery(TACHES,{ variables: {portfolioId: match.params.id},});
  const [deleteReunion] =useMutation(DELETE_REUNION);
  const deleteItem = (item) => {
    deleteReunion({
      variables: {
          id: item._id,
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
              {!!data.projet.responsable && <Typography variant="body2" color="textSecondary" component="p">
               <h2>Responsable : {data.projet.responsable}</h2> 
              </Typography>}
            </CardContent>
          </CardActionArea>
        </Card>
        { !!data.taches && !(data.reunions.taches == []) &&  <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={4}>
                <Paper className={fixedHeightPaper}>
                    <Block>Les taches terminées</Block>
                    <ListTache taches={data.taches} type={"1"} />
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <Paper className={fixedHeightPaper}>
                    <Block>Les taches à faire</Block>
                    <ListTache taches={data.taches} type={"2"} />
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <Paper className={fixedHeightPaper}>
                    <Block>Les taches en cours</Block>
                    <ListTache taches={data.taches} type={"3"} />
                </Paper>
            </Grid>
        </Grid>}
        <ReunionTable  
          tableData={!!data.reunions ? data.reunions :[]}
          projectId ={match.params.id}
          deleteItem={deleteItem}
          />
        <Gant data={data.taches} />
       
      </div>
    
  );
};

export default CheckupsProjetsPage ;
