const joi = require('joi'); // 导入定义验证规则的包

// 验证分类名称和分类别名的验证规则
const name = joi.string().required();
const alias = joi.string().alphanum().required();

// 验证规则对象 根据id删除文章分类
const id = joi.number().integer().min(1).required();

// 验证规则对象 - 新增分类
exports.add_cate_schema = {
  body: {
    name,
    alias,
  },
};

// 验证规则对象 - 根据id删除分类
exports.delete_cate_schema = {
  params: {
    id,
  },
};

// 验证规则对象 - 根据id获取分类
exports.get_cate_schema = {
  params: {
    id,
  },
};

// 验证规则对象 - 根据id更新分类
exports.update_cate_schema = {
  body: {
    id,
    name,
    alias,
  },
};