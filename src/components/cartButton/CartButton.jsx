import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../contexts/ProductContext';
import Classes from './CartButton.module.css';

const CartButton = () => {
    const { allProducts } = useContext(ProductContext);

    const cartProducts = allProducts.filter((product) => product.inCart);

    return (
        <Link to="/cart" className={Classes.cartBtn}>
            <div className={Classes.qty}>
                {cartProducts?.length} {(cartProducts?.length > 1 && 'Items') || 'Item'}
            </div>
            <div className={Classes.cartTotal}>
                Tk.{' '}
                {cartProducts
                    .map((item) => item.price * item.amount)
                    .reduce((total, prevTotal) => total + prevTotal, 0)}
            </div>
        </Link>
    );
};

export default CartButton;
