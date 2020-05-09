import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import {tableIcons} from './icons'
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const ADD_REUNION = gql`
    mutation createReunion($input: ReunionInput) {
        createReunion(input: $input) {
        name
        description
        date
        }
    }
`;
const useStyles = makeStyles((theme) => ({
    allWidth: {
      width: "100%",
      marginBottom: "20px"
    },
  
  }));
  
export const ReunionTable = ({ tableData,projectId} = []) => {
    const classes = useStyles(); 

    const [state, setState] = React.useState({
        data : tableData
      });
      const  columns= [
        { title: 'Nom', field: 'name' },
        { title: 'Description', field: 'description',width: 700 },
        { title: 'Date', field: 'date',type: 'date'},  
      ]

      const history = useHistory();
      function handleClick(type,id) {
       history.push(`/checkup/Reunion/${id}`);
     }
   const [addReunion] = useMutation(ADD_REUNION);

   const addItem = (name,description,date) => {
    addReunion({
      variables: {
          input: {"projetId":projectId,"name": name ,"description" :description,"date":date,"parent" :projectId},
      }
     });
     window.location.reload(false) ;
  }
    
    return (
        <div className={classes.allWidth}>
        <MaterialTable
            title={"Liste des reunions"}
            icons={tableIcons}
            data={state.data}
            editable={{
              onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                    addItem(newData.name,newData.description,newData.date)
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
              onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                 // updateItem(newData)
                  if (oldData) {
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  //deleteItem(oldData);
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
            columns={columns}
            onRowClick={(event, rowData) => {handleClick(rowData.__typename,rowData._id)}}
            options={{
                actionsColumnIndex: -1,
                paging: false,
              }}
        />
    </div>
    );
}
