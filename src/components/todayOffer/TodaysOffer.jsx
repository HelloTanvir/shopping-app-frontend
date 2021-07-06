import { Fab, makeStyles } from '@material-ui/core';
import { Navigation } from '@material-ui/icons';
import React, { useContext } from 'react';
import { DeviceContext } from '../../contexts/DeviceContext';

const useStyle = makeStyles({
    iconCommon: {
        cursor: 'pointer',
        fontSize: 25,
    },
    fab: {
        alignSelf: 'center',
        marginLeft: 100,
    },
    fabSmScr: {
        alignSelf: 'center',
        marginLeft: 20,
    },
});

const TodaysOffer = () => {
    const classes = useStyle();

    const { device } = useContext(DeviceContext);

    const offerClickHandler = (event) => {
        event.stopPropagation();
        alert('No offer now');
    };

    return (
        <Fab
            variant="extended"
            size="small"
            color="default"
            aria-label="add"
            className={
                device === 'tablet' || device === 'mobile' || device === 'sm-mobile'
                    ? classes.fabSmScr
                    : classes.fab
            }
            onClick={offerClickHandler}
        >
            <Navigation />
            today&#39;s offer
        </Fab>
    );
};

export default TodaysOffer;
