/**
 * @desc 向Vue所有组件挂载全局变量
 * @param Vue
 * @param options {Array} 传一个数组，数组的元素为对象{name: , value: }
 * @returns {boolean}
 */
export default function (Vue, options) {
    if(arguments.length ===1) {
        //说明此时没有任何属性需要添加
        return false;
    }
    if(! (options instanceof Array) || options.length === 0) {
        //不是数组或者数组长度为0
        return false;
    }
    //向Vue原型上添加属性
    options.forEach(function (item, index, array) {
        Vue.prototype['$' + item.name] = item.value;
    })
}
