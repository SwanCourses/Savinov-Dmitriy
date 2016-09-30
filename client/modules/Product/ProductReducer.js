/**
 * Created by Freem_000 on 9/26/2016.
 */

import { ADD_PRODUCT, ADD_PRODUCTS, SET_SEARCH_QUERY, SET_GROUP} from './ProductActions';

// Initial State
const initialState = { data: [], searchQuery: '', group: '' };

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_PRODUCTS:
      return {
        ...state,
        data: action.products,
      };

    case ADD_PRODUCT:
      return {
        ...state,
        data: [action.product, ...state.data],
      };

    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.searchQuery
      };

    case SET_GROUP:
      return {
        ...state,
        group: action.group
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all products
export const getProducts = (state, name = '', group = '') => {
  name = name.trim();
  group = group.trim();
  return (name === '') ? (group === '') ? state.products.data : state.products.data.filter(product => `${product.group}` === group) : (group === '') ? state.products.data.filter(product => `${product.name} ${product.price}`.indexOf(name) > -1) : state.products.data.filter(product => `${product.name} ${product.price}`.indexOf(name) > -1 && `${product.group}` === group);
};

// Get product by cuid
export const getProduct = (state, cuid) => state.products.data.filter(product => product.cuid === cuid)[0];

// Export Reducer
export default ProductReducer;
