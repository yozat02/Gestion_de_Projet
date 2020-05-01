import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {TreeTable} from "../Home/TreeTable/TreeTable";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';


const TACHES = gql`
query taches($portfolioId: ID!) {
    taches(portfolioId: $portfolioId) {
    _id
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
        <TreeTable title={"Liste des taches"} tableData={array} addItem={addItem} />
      </div>
    
  );
};

export default CheckupsProjetsPage ;
