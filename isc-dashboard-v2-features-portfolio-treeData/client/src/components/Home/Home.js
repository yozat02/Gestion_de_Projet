import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Block from '../Commons/Block/Block'
import PortfolioTable from './PortfolioTable/PortfolioTable'


const useStyles = makeStyles((theme) => ({

    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
    },
    fixedHeight: {
        height: 240,
    },
}));

const Home = () => {

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <>
            <Grid item xs={12} md={4} lg={4}>
                <Paper className={fixedHeightPaper}>
                    <Block>My open actions</Block>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <Paper className={fixedHeightPaper}>
                    <Block>Stats</Block>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <Paper className={fixedHeightPaper}>
                    <Block>Important messages</Block>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <PortfolioTable />
            </Grid>

        </>
    );
}

export default Home;
