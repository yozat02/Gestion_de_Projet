import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {TreeTable} from "../Home/TreeTable/TreeTable";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const DEVELOPPEURS = gql`
query developpeurByTacheId($tacheId: ID!) {
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

const useStyles = makeStyles((theme) => ({
  allWidth: {
    width: "100%",
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

  if (loading) return <p>Loading...</p>;
  let array = []
  if (!error) {
    array = data.developpeurByTacheId
  }

  
  return (
    
      <div className={classes.allWidth}>
        <TreeTable title={"Liste des developpeurs"} tableData={array} addItem={addItem} />
      </div>
    
  );
};

export default CheckupsTachesPage ;