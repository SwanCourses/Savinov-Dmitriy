/**
 * Created by Freem_000 on 9/26/2016.
 */

import { ADD_PRODUCT, ADD_PRODUCTS, SET_SEARCH_QUERY, SET_GROUP, SET_CATEGORY} from './ProductActions';

// Initial State
const initialState = { data: [], searchQuery: '', group: '', category: '' };

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

    case SET_CATEGORY:
      return{
          ...state,
        category: action.category
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all products
export const getProducts = (state, name = '', group = '', category = '') => {
  name = name.trim();
  group = group.trim();
  category = category.trim();

  if (name === '' && group === '' && category === '') {
    return state.products.data
  }  else if (name === '' ){
    if (category === '' && group === '')
    {
      return state.products.data;
    }else if(category === '')
    {
      return state.products.data.filter(product => product.group === group)
    }else if(group === '')
    {
      return state.products.data.filter(product => product.category === category)
    }
  }else if (group === '' ){
    if (category === '' && name === '')
    {
      return state.products.data;
    }else if(category === '')
    {
      return state.products.data.filter(product => `${product.name} ${product.price}`.indexOf(name) > -1)
    }else if(name === '')
    {
      return state.products.data.filter(product => product.category === category)
    }
  }else if (category === '' ){
    if (group === '' && name === '')
    {
      return state.products.data;
    }else if(group === '')
    {
      return state.products.data.filter(product => `${product.name} ${product.price}`.indexOf(name) > -1)
    }else if(name === '')
    {
      return state.products.data.filter(product => product.group === group)
    }
  } else {
    return state.products.data.filter(product => `${product.name} ${product.price}`.indexOf(name) > -1 && product.group === group && product.category === category)
  }
};

// Get product by cuid
export const getProduct = (state, cuid) => state.products.data.filter(product => product.cuid === cuid)[0];

// Export Reducer
export default ProductReducer;
