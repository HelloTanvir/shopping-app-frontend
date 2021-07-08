import { makeStyles } from '@material-ui/core';
import { Facebook, Instagram, Twitter } from '@material-ui/icons';
import React from 'react';
import Classes from './SocialIcons.module.css';

const useStyle = makeStyles({
    iconCommon: {
        cursor: 'pointer',
        fontSize: 25,
    },
});

const SocialIcons = ({ inDrawer }) => {
    const classes = useStyle();
    return (
        <div className={inDrawer ? Classes.socialIconsInDrawer : Classes.socialIcons}>
            <Facebook
                className={classes.iconCommon}
                style={{ color: '#4267B2' }}
                onClick={() => window.location.replace('https://www.facebook.com/tanvir.stmz/')}
            />
            <Twitter className={classes.iconCommon} style={{ color: '#55acee' }} />
            <Instagram className={classes.iconCommon} style={{ color: '#b42e85' }} />
        </div>
    );
};

export default SocialIcons;
