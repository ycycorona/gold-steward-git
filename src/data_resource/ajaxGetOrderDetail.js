
function ajax(vueObj, orderNo) {
    let timeStamp = Number(new Date());
    let token = vueObj.$handleTokenHeader(timeStamp);
    let option = {
        url: vueObj.$URLList.getAirMallOrderDetail + orderNo,
        method: 'get',
        headers: {
            'timeStamp': timeStamp,
            'sellerId': 'WECHAT',
            'token': token
        }
    };
    return new Promise((resolve, reject) => {
        vueObj.$http.request(option)
            .then((res) => {
                if (res.data.code == 1) {
                    //请求成功
                    resolve(res.data);
                }
            })
            .catch((code) => {
                reject('获取数据时与后台通讯失败' + JSON.stringify(code));
            })
    });

}


export default function (vueObj, orderNo) {
    return new Promise ((resolve, reject) =>{
        ajax(vueObj, orderNo)
            .then((data) => {
                resolve(data) ;
            })
            .catch((error) => {
                reject(error);
            })
    })
}
