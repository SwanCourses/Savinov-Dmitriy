/**
 * Created by Freem_000 on 9/26/2016.
 */

import React, {Component} from 'react'

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { addProductRequest }from '../../ProductActions';

import  styles from './ProductFormPage.css'

const sizes = ['XS','S','M','L','XL'];
const categories = ['Male','Female','Kids','Unisex'];

class ProductFormPage extends Component {
  constructor(props){
      super(props);
      this.state = { colors: {'color_1': '#ffffff', 'color_2': 'black'}};
  }

  onAddColor = () => {
    let colors = this.state.colors;
    let index = Object.keys(colors).length;
    while("color_" + index in colors) {
      index++;
    }
    colors["color_" + index] = "";
    this.setState({colors: colors});
  };

  onChangeColor = (e) => {
    console.log(e.target.name);
    let colors = this.state.colors;
    colors[e.target.name] = e.target.value;
    this.setState({ colors: colors });
  };

  onRemoveColor = (e) =>
  {
    let colors = this.state.colors;
    delete colors[e.target.value];
    this.setState({colors: colors});
  };

  onChange = (e)=> {
    console.log(e.target.name );
    console.log(e.target.value );
    this.setState({[e.target.name]: e.target.value });
  };

  addProduct = ()=> {

    let form = new FormData();
    form.append('product[name]', this.state.name);
    form.append('product[code]', this.state.code);
    form.append('product[price]', this.state.price);
    form.append('product[description]', this.state.description);
    form.append('product[size]', this.state.size);
    form.append('product[category]', this.state.category);
    console.log(this.state.size );
    for(let i = 0; i < this.refs.photos.files.length; i++) {
      form.append('product[photos]', this.refs.photos.files[i], this.refs.photos.files[i].name)
    }
    form.append('product[colors]', JSON.stringify(this.state.colors));

console.log("YEAH!");
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
          <select name="size" className={styles['cbx-sizes']} value={this.state.size} onChange={this.onChange}>
            <option disabled>{this.props.intl.messages.productSize}</option>
            {
              sizes.map(function(size) {
                return <option key={"product_size_" + size} value={size}>{size}</option>;
              })
            }
          </select>
          <select name="category" className={styles['cbx-categories']} value={this.state.category} onChange={this.onChange}>
            <option disabled>{this.props.intl.messages.productSize}</option>
            {
              categories.map(function(category) {
                return <option key={"product_category_" + category} value={category}>{category}</option>;
              })
            }
          </select>
          <textarea placeholder={this.props.intl.messages.productDescription} value={this.state.description}
                    onChange={this.onChange}
                    className={styles['form-field']}
                    name="description"/>
          <AddColor colors={this.state.colors} onChangeColor={this.onChangeColor} onRemoveColor={this.onRemoveColor} onAddColor={this.onAddColor} />
          <div className={styles['photos-upload']}>
            <input ref="photos" type="file" multiple onChange={this.onChange}/>
          </div>
          <div><a className={styles['post-submit-button']} href="#" onClick={this.addProduct}><FormattedMessage id="submit"/></a></div>
        </div>
      </div>
    )
  }
}

function AddColor(props){
        let colors =[];
        Object.keys(props.colors).forEach(function(key) {
          colors.push(
          <div>
            <input type="text" className={styles['txt-color-item']} onChange={props.onChangeColor} name={key} value={props.colors[key]}/>
            <button className={styles['btn-remove-color']} onClick={props.onRemoveColor} name={"btn-remove-" + key} value={key}> - </button>
          </div>);
      })
  return (
  <div>
    { colors }
    <input type="button" className={styles['btn-add-color']} onClick={props.onAddColor} value="add color"/>
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
