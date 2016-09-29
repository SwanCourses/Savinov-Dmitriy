/**
 * Created by Freem_000 on 9/28/2016.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductListItem from '../../components/ProductListItem/ProductListItem';

import styles from './ProductListPage.css';

// Import Selectors
import { getProducts } from '../../ProductReducer';
import { setSearchQuery } from '../../ProductActions';
import { setCategory } from '../../ProductActions';

class ProductListPage extends Component {
  constructor(props) {
    super(props);
    this.state = { searchQuery: '' };
    this.state = { category: '' };
  }

  componentDidMount() {
    this.setState({ products: this.props.products });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles['filter-panel']}>
          <input type="search" value={this.props.searchQuery} placeholder="Type name..."
                 onChange={e=>this.props.dispatch(setSearchQuery(e.target.value))}/>
        </div>
        <div className={styles['products-menu']}>
          <a href="#" onClick={e=>this.props.dispatch(setCategory('Male'))} className={styles['menu-item']}>Male</a>
          <a href="#" onClick={e=>this.props.dispatch(setCategory('Female'))} className={styles['menu-item']}>Female</a>
          <a href="#" onClick={e=>this.props.dispatch(setCategory('Kids'))} className={styles['menu-item']}>Kids</a>
          <a href="#" onClick={e=>this.props.dispatch(setCategory('Unisex'))} className={styles['menu-item']}>Unisex</a>
          <a href="#" onClick={e=>this.props.dispatch(setCategory(''))} className={styles['menu-item']}>All</a>
        </div>

        <div className={styles.products}>
          {
            this.props.products.map(product=> (
              <div key={product.cuid} className={styles.product}>
                <ProductListItem key={product.cuid} {...product}/>
              </div>
            ))
          }
        </div>

      </div>
    )
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    searchQuery: state.products.searchQuery,
    category: state.products.category,
    products: getProducts(state, state.products.searchQuery, state.products.category),
  };
}

export default connect(mapStateToProps)(ProductListPage);
