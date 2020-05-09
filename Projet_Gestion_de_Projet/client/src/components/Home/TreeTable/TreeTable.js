import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom'
import {tableIcons} from './icons'


export const  TreeTable = ({ tableData,columns,title,rowClick,addItem,deleteItem,updateItem} = []) => {


    const [state, setState] = React.useState({
        data : tableData
      });

    const history = useHistory();
    function handleClick(type,id) {
     history.push(`/checkup/`+type+`/${id}`);
   }
 
    return (

        <MaterialTable
            title={title}
            icons={tableIcons}
            data={state.data}
            editable={{
              onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  addItem(newData)
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
                  updateItem(newData)
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
                  deleteItem(oldData);
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
            columns={columns}
            onRowClick={(event, rowData) => { rowClick && handleClick(rowData.__typename,rowData._id)}}
            options={{
                actionsColumnIndex: -1,
                paging: false,
              }}
        />
    );
}
