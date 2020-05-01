import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import BuildIcon from '@material-ui/icons/Build';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TimelineIcon from '@material-ui/icons/Timeline';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

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
    const [openCheckups, setOpenCheckups] = useState(false);
    const [openReporting, setOpenReporting] = useState(false);

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
