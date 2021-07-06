import { Button, Fab, makeStyles, TextField } from '@material-ui/core';
import { Facebook, Instagram, Navigation, Twitter } from '@material-ui/icons';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import CartButton from '../cartButton/CartButton';
import MenuDrawer from '../menuDrawer/MenuDrawer';
import Classes from './Header.module.css';

const useStyle = makeStyles({
    iconCommon: {
        cursor: 'pointer',
        fontSize: 25,
    },
    fab: {
        alignSelf: 'center',
        marginLeft: 100,
    },
});

const Header = ({ inCartPage }) => {
    const classes = useStyle();
    const history = useHistory();

    const [scrolling, setScrolling] = useState(false);

    const [searchText, setSearchText] = useState('');

    document.addEventListener('scroll', () => {
        setScrolling(window.scrollY > window.innerHeight - 50);
    });

    const offerClickHandler = (event) => {
        event.stopPropagation();
        console.log('No offer now');
    };

    const handleSearch = (e) => {
        e.preventDefault();

        history.push(`/${searchText}`);
        setTimeout(() => {
            document
                .getElementById('product-section')
                ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    };

    return (
        <>
            <div
                className={[
                    Classes.header,
                    scrolling || inCartPage ? Classes.headerColored : null,
                ].join(' ')}
            >
                <MenuDrawer />

                <Link to="/" className={Classes.logoContainer}>
                    <img src={logo} alt="atharo" className={Classes.logo} />
                </Link>

                {/* <div className={[Classes.searchBox, scrolling && Classes.searchBoxScrolled].join(' ')}> */}
                <div className={[Classes.searchBox, Classes.searchBoxScrolled].join(' ')}>
                    <form
                        style={{ flex: 1, display: 'flex', alignItems: 'center' }}
                        onSubmit={handleSearch}
                    >
                        <TextField
                            id="standard-basic"
                            label="Search your products"
                            autoComplete="off"
                            style={{ flex: 1, marginRight: 10 }}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={handleSearch}
                        >
                            Search
                        </Button>
                    </form>
                </div>

                <Fab
                    variant="extended"
                    size="small"
                    color="default"
                    aria-label="add"
                    className={classes.fab}
                    onClick={offerClickHandler}
                >
                    <Navigation />
                    today&#39;s offer
                </Fab>

                <div className={Classes.socialIcons}>
                    <Facebook className={classes.iconCommon} style={{ color: '#4267B2' }} />
                    <Twitter className={classes.iconCommon} style={{ color: '#55acee' }} />
                    <Instagram className={classes.iconCommon} style={{ color: '#b42e85' }} />
                </div>
            </div>
            <CartButton />
        </>
    );
};

export default Header;
