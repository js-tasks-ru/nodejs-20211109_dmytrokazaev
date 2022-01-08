const mapProduct = require('../mappers/product');
const Product = require('../models/Product');

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const {subcategory} = ctx.query;

  if (!subcategory) return next();

  const products = (await Product.find({
    subcategory,
  })).map(mapProduct);

  ctx.body = {products};
};

module.exports.productList = async function productList(ctx) {
  const products = (await Product.find()).map(mapProduct);

  ctx.body = {products};
};

const ObjectId = require('mongoose').Types.ObjectId;

module.exports.productById = async function productById(ctx) {
  const {id} = ctx.params;
  try {
    const product = await Product.findOne({_id: new ObjectId(id)});

    if (!product) {
      ctx.status = 404;
      return;
    }

    ctx.body = {product: mapProduct(product)};
  } catch (e) {
    ctx.status = 400;
  }
};

