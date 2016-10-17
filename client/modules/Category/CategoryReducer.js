/**
 * Created by Freem_000 on 10/11/2016.
 */
import { ADD_CATEGORIES, ADD_CATEGORY } from './CategoryActions';

// Initial State
const initialState = { data: [] };

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_CATEGORIES:
      return {
        data: action.categories,
      };
    case ADD_CATEGORY:
      return {
        ...state,
        data: [action.category, ...state.data],
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all categories
export const getAllCategories = state => state.categories.data;

// Get categories by group
export const getCategories = (state, group) => {
  let products = state.products.data.filter(p => p.category != null && group === p.group);
  return state.categories.data.filter(category => {
    for (let product of products) {
      if (product.category === category.cuid) {
        return true;
      }
    }
  })
};

// Get product by cuid
export const getCategory = (state, cuid) => state.categories.data.filter(category => category.cuid === cuid)[0];

// Export Reducer
export default CategoryReducer;
