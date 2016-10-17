/**
 * Created by Freem_000 on 10/11/2016.
 */
import callApi, { callApiForm } from '../../util/apiCaller';

export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const ADD_CATEGORY = 'ADD_CATEGORY';

export function addCategories(categories) {
  return {
    type: ADD_CATEGORIES,
    categories,
  };
}

export function addCategory(category) {
  return {
    type: ADD_CATEGORY,
    category,
  };
}

export function fetchCategories() {
  return (dispatch) => {
    return callApi('categories').then(res => {
      dispatch(addCategories(res.categories));
    });
  };
}

export function addCategoryRequest(category) {
  return (dispatch) => {
    return callApi('categories', 'post', {category}).then(res => dispatch(addCategory(res.category)));
  };
}
