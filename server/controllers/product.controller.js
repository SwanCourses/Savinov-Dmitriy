/**
 * Created by Freem_000 on 9/26/2016.
 */

import Product from '../models/product';
import cuid from 'cuid';

import sanitizeHtml from 'sanitize-html';
/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getProducts(req, res) {
  Product.find().sort('name').exec((err, products) => {
    if (err) {
      res.status(500).send(err);
    }else {
      res.json({products});
    }
  });
}

export function addProduct(req, res) {
  if (!req.body.product.name || !req.body.product.code || !req.body.product.price || !req.body.product.description) {
    res.status(403).end();
  } else {
    const newProduct = new Product(req.body.product);
    // Let's sanitize inputs
    newProduct.code = sanitizeHtml(newProduct.code);
    newProduct.name = sanitizeHtml(newProduct.name);
    newProduct.description = sanitizeHtml(newProduct.description);
    newProduct.cuid = cuid();
    let colors = newProduct.colors = JSON.parse(newProduct.colors);
    let i = 0;
    Object.keys(colors).forEach(function(key) {
      newProduct.colors[key].color = sanitizeHtml(newProduct.colors[key].color);
      for(let j = 0, file; file = colors[key].photos[j]; j++) {
        console.log(req.files);
        newProduct.colors[key].photos[j].filename = req.files[i].filename;
        newProduct.photos.push({ fileName: req.files[i].filename});
        i++;
      }
    });
    newProduct.save().then((saved)=> {
      res.json({ product: saved });
    }).catch((err) => {
      res.status(500).send(err);
    });
  }
}
