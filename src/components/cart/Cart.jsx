import {
    CancelPresentationRounded,
    ExposureNeg1Rounded,
    ExposurePlus1Rounded
} from '@material-ui/icons';
import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import * as types from '../../utils/actionTypes';
import Checkout from '../checkout/Checkout';
import Classes from './Cart.module.css';

const Cart = ({ setInCartPage }) => {
    const { allProducts, dispatch } = useContext(ProductContext);

    const cartProducts = allProducts.filter((product) => product.inCart);

    const removeProductHandler = (id) => dispatch({ type: types.REMOVE_PRODUCT, payload: { id } });

    const increaseProductQtyHandler = (id) =>
        dispatch({ type: types.INCREASE_QTY, payload: { id } });

    const decreaseProductQtyHandler = (id, qty) => {
        const type = qty <= 1 ? types.REMOVE_PRODUCT : types.DECREASE_QTY;
        dispatch({ type, payload: { id } });
    };

    useEffect(() => {
        setInCartPage(true);
        return () => setInCartPage(false);
    }, [setInCartPage]);

    return (
        <div className={Classes.cartPage}>
            <div className={Classes.sectionTitle}>your cart</div>
            {cartProducts?.length ? (
                <div className={Classes.container}>
                    <div className={Classes.productsWrapper}>
                        {cartProducts.map((product) => (
                            <div key={product._id} className={Classes.cartPtoduct}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className={Classes.productImage}
                                />
                                <div className={Classes.productName}>{product.name}</div>
                                <div className={Classes.productAmount}>{product.amount} unit</div>
                                <div className={Classes.productPrice}>Tk. {product.price}</div>
                                <div className={Classes.productTotal}>
                                    Tk. {+product.amount * +product.price}
                                </div>
                                <CancelPresentationRounded
                                    className={Classes.removeItem}
                                    onClick={() => removeProductHandler(product._id)}
                                />
                                <div className={Classes.changeQuantity}>
                                    <ExposureNeg1Rounded
                                        className={Classes.changeQtyBtn}
                                        onClick={() =>
                                            decreaseProductQtyHandler(product._id, product.amount)
                                        }
                                    />
                                    <div className={Classes.quantity}>{product.amount}</div>
                                    <ExposurePlus1Rounded
                                        className={Classes.changeQtyBtn}
                                        onClick={() => increaseProductQtyHandler(product._id)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={Classes.cart}>
                        <div className={Classes.memoItem}>
                            <span className={Classes.title}>total items :</span>{' '}
                            {cartProducts?.length}
                        </div>
                        <div className={Classes.memoItem}>
                            <span className={Classes.title}>total price :</span>Tk.{' '}
                            {cartProducts
                                .map((item) => item.price * item.amount)
                                .reduce((total, prevTotal) => total + prevTotal, 0)}
                        </div>
                        {/* Checkout button */}
                        <Checkout />
                    </div>
                </div>
            ) : (
                <div className={Classes.empty}>your cart is empty</div>
            )}
        </div>
    );
};

export default Cart;
