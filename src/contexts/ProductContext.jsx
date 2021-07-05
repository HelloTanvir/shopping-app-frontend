import { createContext, useEffect, useReducer, useState } from 'react';
import Loader from '../components/loader/Loader';
import ProductReducer from '../reducers/ProductReducer';
import * as types from '../utils/actionTypes';
import axios from '../utils/axios';

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
    const [allProducts, dispatch] = useReducer(ProductReducer, []);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const dataLoader = async () => {
            setIsLoading(true);

            try {
                const res = await axios.get('/products');

                if (res) setIsLoading(false);

                dispatch({ type: types.LOAD_PRODUCTS, payload: { data: res.data } });
            } catch (err) {
                setIsLoading(false);
                console.log(err?.response?.data?.message ?? 'Something went wrong');
            }
        };
        dataLoader();
    }, []);

    return (
        <ProductContext.Provider value={{ allProducts, dispatch, setIsLoading }}>
            <Loader isLoading={isLoading} />
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContextProvider;
