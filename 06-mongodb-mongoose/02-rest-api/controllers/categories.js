const Category = require('../models/Category');
const mapCategory = require('../mappers/category');

module.exports.categoryList = async (ctx) => {
  const categories = (await Category.find()).map(mapCategory);
  ctx.body = {categories};
};
