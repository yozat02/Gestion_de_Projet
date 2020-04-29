import React from "react";

//import { MainLayout } from "../../../Layouts";

import { makeStyles } from "@material-ui/core/styles";

import TreeTable from "../Home/TreeTable/TreeTable";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';



const TACHES = gql`
query taches($portfolioId: ID!) {
    taches(portfolioId: $portfolioId) {
    _id
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

const CheckupsProjetsPage = ({match}) => {
  const classes = useStyles();
  console.log("match",match.params.id)
 
  let { loading, error, data } = useQuery(TACHES,{ variables: {portfolioId: match.params.id},});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  

  return (
    
      <div className={classes.allWidth}>
        <TreeTable title={"Taches"} tableData={data.taches} />
      </div>
    
  );
};

export default CheckupsProjetsPage ;