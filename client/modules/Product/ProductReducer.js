/**
 * Created by Freem_000 on 9/26/2016.
 */

import { ADD_PRODUCT, ADD_PRODUCTS, SET_SEARCH_QUERY, SET_CATEGORY} from './ProductActions';

// Initial State
const initialState = { data: [], searchQuery: '', category: '' };

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

    case SET_CATEGORY:
      return {
        ...state,
        category: action.category
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all products
export const getProducts = (state, name = '', category = '') => {
  let result = state.products.data;
  name = name.trim();
  category = category.trim();
  result = category === '' ? result : state.products.data.filter(product =>  `${product.category}`.indexOf(category) > -1);
  result = name === '' ? result : state.products.data.filter(product =>  `${product.name} ${product.price}`.indexOf(name) > -1);

  return result;

};

// Get product by cuid
export const getProduct = (state, cuid) => state.products.data.filter(product => product.cuid === cuid)[0];

// Export Reducer
export default ProductReducer;
