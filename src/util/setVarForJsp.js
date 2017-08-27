/**
 * @desc 把在jsp里运行需要的各种参数、数据挂载到webpack的global变量上
 * @param otherVar
 * @returns basePath URLLists以及其他自定义的变量
 */
/*每一个otherVar的格式遵循{name:'test',val:123}，name是最后生成的全局变量的名字*/
import {URLLists, devURLLists} from '../data/urlList.js'
/*使用的时候需要在jsp的script标签里定义相关变量*/
function setVarForJsp() {
console.log(arguments);
    /*把传入的变量，绑定到webpack的global全局变量*/
    for (let paraIndex in arguments) {
        global[arguments[paraIndex].name] = arguments[paraIndex].val;
    }
    /*用tyr-catch来测试处于正式还是开发环境，进行不同的变量配置，使用jsp时，需要指定basepath*/
    try {
        global.basePath = basePath;
        /*正式用 URL列表*/
        /*global.URLLists = URLLists;*/
        console.log('try,项目的basePath为：' + global.basePath + '此时应为正式环境');
    } catch (e) {
        global.basePath = '';
        /*URL列表 开发用*/
        global.URLLists = devURLLists;
        console.log('catch,项目的basePath为：' + global.basePath + '此时应为前端开发环境');
    }
}
export {
    setVarForJsp
}
