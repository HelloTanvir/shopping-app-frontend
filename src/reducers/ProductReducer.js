/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import * as types from '../utils/actionTypes';

const ProductReducer = (state, action) => {
    let index = -1;

    const getIndex = (id) => state.findIndex((product) => product._id === id);

    switch (action.type) {
        case types.LOAD_PRODUCTS:
            return [...state, ...action.payload.data];

        case types.ADD_PRODUCT:
            state[action.payload.id].inCart = true;
            state[action.payload.id].amount = 1;
            return [...state];

        case types.REMOVE_PRODUCT:
            index = getIndex(action.payload.id);
            state[index].inCart = false;
            return [...state];

        case types.INCREASE_QTY:
            index = getIndex(action.payload.id);
            state[index].amount += 1;
            return [...state];

        case types.DECREASE_QTY:
            index = getIndex(action.payload.id);
            state[index].amount -= 1;
            return [...state];

        default:
            return state;
    }
};

export default ProductReducer;
