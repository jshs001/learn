const joi = require('joi'); // 导入定义验证规则的包

// 定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required();
const password = joi.string().pattern(/^[\S]{6,12}$/).required();

// 定义 id nickname email 的验证规则
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();

// 验证头像的验证规则
const avatar = joi.string().dataUri().required();
// const avatar = joi.string().min(1).max(100000).required();

// // 验证分类名称和分类别名的验证规则
// const name = joi.string().required();
// const alias = joi.string().alphanum().required();

// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
  body: {
    username,
    password,
  },
};

// 验证规则对象 - 更新用户基本信息
exports.update_userinfo_schema = {
  body: { // 我们需要对req.body中的数据进行验证
    id,
    nickname,
    email,
  },
};

// 验证规则对象 - 重置密码
exports.update_password_schema = {
  body: {
    oldPwd: password,
    newPwd: joi.not(joi.ref('oldPwd')).concat(password), // 验证新密码是否和旧密码验证规则一致 且不相等
  },
};

// 验证规则对象 - 更新头像
exports.update_avatar_schema = {
  body: {
    avatar,
  },
};

// // 验证规则对象 - 新增分类
// exports.add_cate_schema = {
//   body: {
//     name,
//     alias,
//   },
// };