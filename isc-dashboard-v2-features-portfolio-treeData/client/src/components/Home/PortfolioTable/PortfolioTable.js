import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import TreeTable from '../TreeTable/TreeTable';

const PROJETS = gql`
 {
  projets{
    _id
    name
    description
  }
}
`;

const PortfolioTable = () => {

let { loading, error, data } = useQuery(PROJETS);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

    console.log(data)
    return (
        <>
          
            <TreeTable tableData={data.projets} title={'Liste des projets'} />
        </>
    );
}

export default PortfolioTable;
