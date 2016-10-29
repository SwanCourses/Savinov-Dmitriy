/**
 * Created by Freem_000 on 9/26/2016.
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: 'String', required: true },
  code: { type: 'String', required: true },
  description: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  price: { type: 'Number', required: true },
  category: {type: 'String', required: true},
  size: {type: 'String', required: true},
  group: {type: 'String', required: false},
  photos: [],
  colors: {type: 'Object'},
});

export default mongoose.model('Product', productSchema);
