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
                    <ListItemText primary="Dashboard" />
                </ListItem>


                <ListItem button component={NavLink} to="/actions" selected={'/actions' === pathname}>
                    <ListItemIcon>
                        <BuildIcon />
                    </ListItemIcon>
                    <ListItemText primary="Actions" />
                </ListItem>

                <ListItem button component={NavLink} to="/manageProjects" selected={'/manageProjects' === pathname}>
                    <ListItemIcon>
                        <AccountTreeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Manage Projects" />
                </ListItem>



                {/* CHECKUPS */}
                <ListItem button onClick={() => setOpenCheckups(!openCheckups)}>
                    <ListItemIcon>
                        <VerifiedUserIcon />
                    </ListItemIcon>
                    <ListItemText primary="Checkups" />
                    {openCheckups ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openCheckups} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={open && classes.nested} component={NavLink} to="/checkup/portfolio" selected={'/checkup/portfolio' === pathname}>
                            <ListItemIcon>
                                <ArrowRightIcon />
                            </ListItemIcon>
                            <ListItemText primary="Portfolio" />
                        </ListItem>
                        <ListItem button className={open && classes.nested} component={NavLink} to="/checkup/program" selected={'/checkup/program' === pathname}>
                            <ListItemIcon>
                                <ArrowRightIcon />
                            </ListItemIcon>
                            <ListItemText primary="Program" />
                        </ListItem>
                        <ListItem button className={open && classes.nested} component={NavLink} to="/checkup/project" selected={'/checkup/project' === pathname}>
                            <ListItemIcon>
                                <ArrowRightIcon />
                            </ListItemIcon>
                            <ListItemText primary="Project" />
                        </ListItem>
                        <ListItem button className={open && classes.nested} component={NavLink} to="/checkup/devOps" selected={'/checkup/devOps' === pathname}>
                            <ListItemIcon>
                                <ArrowRightIcon />
                            </ListItemIcon>
                            <ListItemText primary="DevOps" />
                        </ListItem>
                    </List>
                </Collapse>

                {/* REPORTING */}
                <ListItem button onClick={() => setOpenReporting(!openReporting)}>
                    <ListItemIcon>
                        <TimelineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reporting" />
                    {openReporting ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openReporting} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={open && classes.nested} component={NavLink} to="/reporting/projects" selected={'/reporting/projects' === pathname}>
                            <ListItemIcon>
                                <ArrowRightIcon />
                            </ListItemIcon>
                            <ListItemText primary="Projects" />
                        </ListItem>
                        <ListItem button className={open && classes.nested} component={NavLink} to="/reporting/technical" selected={'/reporting/technical' === pathname}>
                            <ListItemIcon>
                                <ArrowRightIcon />
                            </ListItemIcon>
                            <ListItemText primary="Technical" />
                        </ListItem>
                    </List>
                </Collapse>

            </List>
        </div>

    );

})

export default AppMenu
