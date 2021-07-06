import { Button, IconButton, InputBase, makeStyles, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import { DeviceContext } from '../../contexts/DeviceContext';
import CartButton from '../cartButton/CartButton';
import MenuDrawer from '../menuDrawer/MenuDrawer';
import SocialIcons from '../socialIcons/SocialIcons';
import TodaysOffer from '../todayOffer/TodaysOffer';
import Classes from './Header.module.css';

const useStyles = makeStyles((theme) => ({
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        color: '#fff',
        fontSize: 17,
        '&::placeholder': {
            opacity: 0.85,
            fontSize: 17,
        },
    },
    iconButton: {
        padding: 10,
        color: '#fff',
    },
}));

const Header = ({ inCartPage }) => {
    const classes = useStyles();

    const history = useHistory();

    const { device } = useContext(DeviceContext);

    const [scrolling, setScrolling] = useState(false);

    const [searchText, setSearchText] = useState('');

    document.addEventListener('scroll', () => {
        setScrolling(window.scrollY > window.innerHeight - 50);
    });

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

                <div
                    className={[
                        Classes.searchBox,
                        device === 'sm-mobile' && Classes.searchTextSmall,
                    ].join(' ')}
                >
                    <form
                        style={{ flex: 1, display: 'flex', alignItems: 'center' }}
                        onSubmit={handleSearch}
                    >
                        {device === 'sm-mobile' ? (
                            <>
                                <InputBase
                                    className={classes.input}
                                    placeholder="search products..."
                                    inputProps={{
                                        'aria-label': 'search products',
                                        className: classes.input,
                                    }}
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                                <IconButton
                                    type="submit"
                                    className={classes.iconButton}
                                    aria-label="search"
                                    onClick={handleSearch}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <TextField
                                    id="standard-basic"
                                    label="search products..."
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
                            </>
                        )}
                    </form>
                </div>

                {device === 'mobile' || device === 'sm-mobile' ? null : <TodaysOffer />}

                {device === 'sm-mobile' ? null : <SocialIcons />}
            </div>
            <CartButton />
        </>
    );
};

export default Header;
