/**
 * Created by Freem_000 on 9/28/2016.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductListItem from '../../components/ProductListItem/ProductListItem';
import { Link } from 'react-router';

const groups = ['Male','Female','Kids','Unisex'];

import styles from './ProductListPage.css';

// Import Selectors
import { getProducts } from '../../ProductReducer';
import { setSearchQuery } from '../../ProductActions';
import { setGroup } from '../../ProductActions';

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
        <Link to="/products/new">New product</Link>
        <div className={styles['products-menu']}>
          {
            groups.map(function(group) {
              return <a href="#" onClick={e=> this.props.dispatch(setGroup(group))} className={styles['menu-item']}>{group}</a>
            }, this)
          }
          <a href="#" onClick={e=>this.props.dispatch(setGroup(''))} className={styles['menu-item']}>All</a>
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
    group: state.products.group,
    products: getProducts(state, state.products.searchQuery, state.products.group),
  };
}

export default connect(mapStateToProps)(ProductListPage);
