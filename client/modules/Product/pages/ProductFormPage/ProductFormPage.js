/**
 * Created by Freem_000 on 9/26/2016.
 */

import React, {Component} from 'react'

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { addProductRequest }from '../../ProductActions';

import  styles from './ProductFormPage.css'

const sizes = ['XS','S','M','L','XL'];

class ProductFormPage extends Component {
  constructor(props){
      super(props);
      this.state = {};
  }

  onAddColor = () => {
    var colors = this.state.colors;
    colors.push("");
    this.setState({colors: colors});
  };

  onChangeColor = (e) => {
    let colors = this.state.colors;
    colors[e.target.name.charAt(0)] = e.target.value;
    this.setState({colors: colors});
  };

  onRemoveColor = (e) =>
  {
    let colors = this.state.colors;
    colors.splice(e.target.name.charAt(0), 1);
    this.setState({colors: colors});
  };

  onChange = (e)=> {
    this.setState({[e.target.name]: e.target.value });
  };

  addProduct = ()=> {

    let form = new FormData();
    form.append('product[name]', this.state.name);
    form.append('product[code]', this.state.code);
    form.append('product[price]', this.state.price);
    form.append('product[description]', this.state.description);
    form.append('product[size]', this.state.size);

    form.append('product[photos]', this.refs.photos.files, this.refs.photos.files.name);

    this.props.dispatch(addProductRequest(form))
  };

  render(){
    return (
      <div className={styles.form}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewProduct"/></h2>
          <input placeholder={this.props.intl.messages.productName} value={this.state.name} onChange={this.onChange}
                 className={styles['form-field']} name="name"/>
          <input placeholder={this.props.intl.messages.productCode} value={this.state.code} onChange={this.onChange}
                 className={styles['form-field']} name="code"/>
          <input placeholder={this.props.intl.messages.productPrice} value={this.state.price} onChange={this.onChange}
                 className={styles['form-field']} name="price"
                 type="number"/>
          <select name="size" value={this.state.size} onChange={this.onChange}>
            <option disabled>{this.props.intl.messages.productSize}</option>
            {
              sizes.map(function(size) {
                return <option key={"product_size_" + size} value={size}>{size}</option>;
              })
            }
          </select>
          <textarea placeholder={this.props.intl.messages.productDescription} value={this.state.description}
                    onChange={this.onChange}
                    className={styles['form-field']}
                    name="description"/>
          <div className={styles.photos}>
            <input ref="photos" type="file" multiple onChange={this.onChange}/>
          </div>
          <AddColor colors={this.state.colors} onColorChange={this.onChangeColor} onRemoveColor={this.onRemoveColor} onAddColor={this.onAddColor} />
          <a className={styles['post-submit-button']} href="#" onClick={this.addProduct}><FormattedMessage id="submit"/></a>
        </div>
      </div>
    )
  }
}

function AddColor(props){
  return (
    <div>
      {props.colors.map((item, i) => {
        return (
          <div key={"colorItem_" + i}>
            <input type="text" onChange={props.onChangeColor} name={"txt-color_" + i } value={item}/>
            <input type="button" onClick={props.onRemoveColor} name={"btn-remove-color_" + i}/>
          </div>);
      })}
      <input type="button" className={styles['btn-add-color']} onClick={props.onAddColor}/>
    </div>
  );
}

ProductFormPage.propTypes = {
  intl: intlShape.isRequired,
};

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(injectIntl(ProductFormPage));
