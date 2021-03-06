/**
 * Created by Freem_000 on 9/26/2016.
 */

import callApi, { callApiForm } from '../../util/apiCaller';

import { browserHistory } from 'react-router';
export const ADD_PRODUCTS = 'ADD_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const SET_GROUP = 'SET_GROUP';
export const SET_CATEGORY = 'SET_CATEGORY';

export function addProducts(products) {
  return {
    type: ADD_PRODUCTS,
    products,
  };
}
export function addProduct(product) {
  return {
    type: ADD_PRODUCT,
    product,
  };
}

export function setSearchQuery(searchQuery) {
  return {
    type: SET_SEARCH_QUERY,
    searchQuery,
  };
}

export function setGroup(group) {
  return {
    type: SET_GROUP,
    group,
  };
}

export function setCategory(category) {
  return {
    type: SET_CATEGORY,
      category,
  };
}

export function addProductRequest(form) {
  return (dispatch) => {
    return callApiForm('products', 'post', form).then(res => {
      dispatch(addProduct(res.product));
      browserHistory.push('/products/' + res.product.cuid)
    });
  }
}

export function fetchProducts() {
  return (dispatch) => {
    return callApi('products').then(res => {
      dispatch(addProducts(res.products));
    });
  };
}
