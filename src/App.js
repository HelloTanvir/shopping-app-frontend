import 'antd/dist/antd.css';
import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Banner from './components/banner/Banner';
import Cart from './components/cart/Cart';
import Header from './components/header/Header';
import Product from './components/product/Product';

const App = () => {
    const [inCartPage, setInCartPage] = useState(false);

    return (
        <BrowserRouter>
            <Header inCartPage={inCartPage} />
            <Switch>
                <Route path="/cart">
                    <Cart setInCartPage={setInCartPage} />
                </Route>

                <Route path="/:productsCategory?/:productsSubCategory?">
                    <Banner />
                    <Product />
                </Route>

                {/* <Route path="/" exact>
                    <Banner />
                    <Product />
                </Route> */}
            </Switch>
        </BrowserRouter>
    );
};

export default App;
