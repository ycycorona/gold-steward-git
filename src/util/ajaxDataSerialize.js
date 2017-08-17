/*把对象的键值对序列化成get请求里那种键值对*/
function dataSerialize(obj) {
    var formData = "";
    for (var i in obj) {
        formData += "&" + i + "=" + obj[i];
    }
    formData = formData.slice(1);
    return formData;
}
module.exports = dataSerialize;