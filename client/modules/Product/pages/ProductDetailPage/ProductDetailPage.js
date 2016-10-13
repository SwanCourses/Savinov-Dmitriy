/**
 * Created by Freem_000 on 10/5/2016.
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import styles from './ProductDetailPage.css';

const uploads = '/uploads/products/art';

// Import Selectors
import { getProduct } from '../../ProductReducer';

export class ProductDetailPage extends Component {

  constructor(props) {
    super(props);
    this.state = { selectedColor: Object.keys(this.props.product.colors)[0] }
  }

  salesPrice = ()=>{
    return this.props.product.price * 0.95
  };

  onChangeColor = (e) => {
    console.log(e.target);
    this.setState({selectedColor: e.target.value});
  };

  render() {
    return (
      <div className={styles.container}>
        <Helmet title={this.props.product.name}/>
        <div className={styles['filter-panel']}></div>
        <div className={styles['product']}>
          <ColorsControl colors={this.props.product.colors} onChangeColor={this.onChangeColor} />
          <PhotosControl colors={this.props.product.colors} productCode={this.props.product.code} selectedColor={this.state.selectedColor} />
          </div>
          <div className={styles.info}>
            <div className={styles.name}>{this.props.product.name}</div>
            <div className={styles.code}>{this.props.product.code}</div>
            <div className={styles.price}>{this.props.product.price + ' грн'}</div>
            <div className={styles.price}>{this.salesPrice() + ' грн'}</div>
            <div className={styles.description}>{this.props.product.description}</div>
          </div>
        </div>
    );
  }
}

function PhotosControl(props) {
  let filesContainer = [];
  for(let key in props.colors[props.selectedColor].photos) {
    filesContainer.push(<div key={"color_photo_" + key} className={styles.picture}><img src={`${uploads}_${props.productCode}/${props.colors[props.selectedColor].photos[key].filename}`}/></div>);
  }
  return (
    <div className={styles.photos}>{filesContainer}</div>
  );
}

function ColorsControl(props) {
  let colorsContainer = [];
  Object.keys(props.colors).forEach((key) => {
    colorsContainer.push(<div key={key}>
      <button className={styles['btn-color']} onClick={props.onChangeColor} value={key}>{props.colors[key].color}</button>
    </div>);
  });
  return (
    <div className={styles.colors}>
      { colorsContainer }
    </div>);
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    product: getProduct(state, props.params.cuid),
  };
}

export default connect(mapStateToProps)(ProductDetailPage);
