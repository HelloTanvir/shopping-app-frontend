import Backdrop from '@material-ui/core/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Spin } from 'antd';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Loader = ({ isLoading }) => {
    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={isLoading}>
            {/* <CircularProgress color="inherit" disableShrink /> */}
            <Spin size="large" />
        </Backdrop>
    );
};

export default Loader;
