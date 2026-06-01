const date = require('./src/dateFormat')
const escape = require('./src/htmlEscape')

module.exports = { 
    ...date,   // 扩展运算符 es6语法
    ...escape
}