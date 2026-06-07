const express = require('express')
const router = express.Router()

const expressJoi = require('@escook/express-joi') // 导入验证表单数据的中间件
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/artcate') // 导入验证规则对象

// 导入用户路由处理函数对应的模块
const artCate_handler = require('../router_handler/artcate')

// 获取文章分类列表数据路由
router.get('/cates', artCate_handler.getArticleCates)

// 新增文章分类路由
// router.post('/addcates', artCate_handler.addArticleCates)
router.post('/addcates', expressJoi(add_cate_schema), artCate_handler.addArticleCates)

// 根据id删除分类数据
// router.get('/deletecate/:id', artCate_handler.deleteCateById)
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artCate_handler.deleteCateById)

// 根据Id获取文章分类数据
// router.get('/cates/:id', artCate_handler.getArticleById)
router.get('/cates/:id', expressJoi(get_cate_schema), artCate_handler.getArticleById)

// 根据Id更新文章分类数据
// router.post('/updatecate', artCate_handler.updateCateById)
router.post('/updatecate', expressJoi(update_cate_schema), artCate_handler.updateCateById)

module.exports = router