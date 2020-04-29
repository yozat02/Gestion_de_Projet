import React from "react";

//import { MainLayout } from "../../../Layouts";

import { makeStyles } from "@material-ui/core/styles";

import TreeTable from "../Home/TreeTable/TreeTable";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';



const DEVELOPPEURS = gql`
query developpeurByTacheId($tacheId: ID!) {
    developpeurByTacheId(tacheId: $tacheId) {
    _id
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
  console.log("match",match.params.id)
 
  let { loading, error, data } = useQuery(DEVELOPPEURS,{ variables: {tacheId: match.params.id},});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  

  return (
    
      <div className={classes.allWidth}>
        <TreeTable title={"Taches"} tableData={data.developpeurByTacheId} />
      </div>
    
  );
};

export default CheckupsTachesPage ;