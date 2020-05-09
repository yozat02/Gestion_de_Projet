import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {TreeTable} from "../Home/TreeTable/TreeTable";
import {ReunionTable} from "../Home/TreeTable/ReunionTable";

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Gant } from './gant'


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
  }
  taches(portfolioId :$portfolioId){
    name
    dateDebut
    dateFin
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
        <ReunionTable  
          tableData={!!data.reunions ? data.reunions :[]}
          projectId ={match.params.id}
          />
        <Gant data={data.taches} />
       
      </div>
    
  );
};

export default CheckupsProjetsPage ;
