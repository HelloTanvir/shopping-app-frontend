import { Button, makeStyles } from '@material-ui/core';
import { Empty } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../../contexts/ProductContext';
import * as types from '../../utils/actionTypes';
import Classes from './Product.module.css';

const useStyle = makeStyles({
    addButton: {
        position: 'relative',
        top: 250,
        opacity: 0,
        marginTop: 15,
        transition: '.5s',
    },
});

const Product = () => {
    const classes = useStyle();
    AOS.init();

    const { productsCategory, productsSubCategory } = useParams();

    const [allProducts, setAllProducts] = useState([]);

    const { allProducts: products, dispatch } = useContext(ProductContext);

    useEffect(() => {
        if (!productsCategory) {
            setAllProducts(products);
        } else {
            setAllProducts(
                products.filter((product) =>
                    !productsSubCategory
                        ? product?.category?.toLowerCase() === productsCategory.toLowerCase() ||
                          product?.name?.toLowerCase().includes(productsCategory.toLowerCase()) ||
                          product?.subCategory
                              ?.toLowerCase()
                              .includes(productsCategory.toLowerCase())
                        : product?.subCategory?.toLowerCase() === productsSubCategory.toLowerCase()
                )
            );
        }
    }, [productsCategory, products, productsSubCategory]);

    const addToCartHandler = (id) => dispatch({ type: types.ADD_PRODUCT, payload: { id } });

    return (
        <div id="product-section" className={Classes.productsContainer}>
            <div data-aos="zoom-in-up" className={Classes.sectionTitle}>
                Our Products
            </div>

            {allProducts.length > 0 ? (
                allProducts.map((product, index) => (
                    <div key={product._id} data-aos="fade-up" className={Classes.card}>
                        <div className={Classes.imgBx}>
                            <img src={product.image} alt="" />
                        </div>

                        <div className={Classes.contentBx}>
                            <span className={Classes.name}>{product.name}</span>
                            <span className={Classes.price}>Tk. {product.price}</span>
                            <Button
                                variant="contained"
                                color="primary"
                                className={[Classes.buy, classes.addButton].join(' ')}
                                onClick={(e) => {
                                    e.preventDefault();
                                    addToCartHandler(index);
                                }}
                                disabled={product.inCart}
                            >
                                {product.inCart ? 'already added' : 'add to bag'}
                            </Button>
                        </div>
                    </div>
                ))
            ) : (
                <Empty style={{ gridColumn: '1/-1' }} description="No such products available" />
            )}
        </div>
    );
};

export default Product;
