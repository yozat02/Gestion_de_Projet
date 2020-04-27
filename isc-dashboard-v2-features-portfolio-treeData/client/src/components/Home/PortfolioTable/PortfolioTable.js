import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import TreeTable from '../TreeTable/TreeTable';


// const ITEMS = gql`
// {
//   items  {
//     _id
//     name
//     description
//     parent
    
//   }
 
// }
// `;
const PORTFOLIOS = gql`
{
  portfolios {
    _id
    name
    description
    parent
    programs{
      _id
      name
      description
      projects
    }
    projects
  }
  projects{
    _id
    name
    description
  }
}
`;

const PortfolioTable = (props) => {

    const { loading, error, data } = useQuery(PORTFOLIOS);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
      let array = [...data.portfolios]
     data.portfolios.map(e => {
        let id = e._id
        if(e.programs) {
          e.programs.map( e => {
            let program = e;
            let __id = e._id
            program.parent = id
            array.push(program)
            if(e.projects){
              e.projects.map(e => {
                let projet = data.projects.find( a =>  a._id == e) ;
                projet.parent = __id 
                array.push(projet)
              })
            }
          })
        }
        if(e.projects){
          e.projects.map(e => {
            let projet = data.projects.find( a =>  a._id == e) ;
            projet.parent = id 
            array.push(projet)
          })
        }
      })
  // const list = data.items ;
    return (
        <>

            <TreeTable tableData={array} />
        </>
    );
}

export default PortfolioTable;
