/**
 * 把带？的查询参数转换成键值对
 * @param searchParams  window.location.search
 * @returns {*}
 */
function getSearchParams(searchParams) {
    /*判断是否是正常的查询字符串，不是的话，结束函数*/
    if (! (searchParams.indexOf('?') === 0)) {
        return false;
    }
    var searchObj = {}; //最终要返回的查询对象
    var searchParamArray = searchParams.slice(1).split('&'); //查询字符串数组
    searchParamArray.forEach(function (searchItem, idnex, thisArray) {
        var tagPosition = searchItem.indexOf('='); //等号的位置
        searchObj[searchItem.slice(0, tagPosition)] = searchItem.slice(tagPosition+1);
    });
    return searchObj;
}
module.exports = getSearchParams;
