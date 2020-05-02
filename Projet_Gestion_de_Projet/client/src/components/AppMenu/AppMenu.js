import React from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const AppMenu = withRouter(({ location: { pathname }, open }) => {

    const classes = useStyles();
    

    return (

        <div>
            <List>
                <ListItem button component={NavLink} to="/" selected={'/' === pathname}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Mes Projets" />
                </ListItem>
            </List>
        </div>

    );

})

export default AppMenu
