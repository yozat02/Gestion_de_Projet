import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export const ListTache = ({taches,type}) => {
    let list = [] ;
    let date = new Date();
    console.log(date ,new Date(taches[0].dateFin))
    if(type==="1"){
        list = taches.filter(tache => new Date(tache.dateFin) < date ) ;
    }
    if(type === "2"){
        list = taches.filter(tache => new Date(tache.dateDebut) > date ) ;
    }
    if(type === "3"){
        list = taches.filter(tache => new Date(tache.dateDebut) < date &&  date < new Date(tache.dateFin)) ;
    }
    return (
        <div>
            <List >
               {!!list && list.map(tache => (
                <ListItem>
                <ListItemText
                 primary={tache.name+" : "+tache.description }
                />
            </ListItem>
               ) )}     
            </List>
       </div>
      );
}

