const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    category : {
      type: Schema.Types.ObjectId,
      ref: 'category'
    }
});

module.exports = mongoose.model('product', productSchema);