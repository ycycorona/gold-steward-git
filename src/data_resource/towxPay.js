import wx from 'weixin-js-sdk'

/**
 * @desc 从后台获取支付参数
 * @param
 */
function getPayObj(vueObj, orderNo) {

    //需要订单号和openId
    let postData = vueObj.$ajaxDataSerialize({
        id: orderNo,
    });

    let option = {
        url: URLLists.createPayOrder,
        method: 'post',
        data: postData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    return new Promise((resolve, reject) => {
        //resolve('后台获取订单数据成功');
        vueObj.$http.request(option)
            .then((res) => {
                //todo: 判断后台获取的支付订单信是否合法
                if(res.data.successFlag == false){
                    //getWxPayInfo失败
                    reject(res.data.errorcode);
                }else{
                    //请求成功，resolve订单信息
                    resolve({
                        data: res.data,
                        vueObj: vueObj
                    });
                }
            })
            .catch((code) => {
                window.alert('createPayOrder时与后台通讯失败' + JSON.stringify(code))
                //window.location.reload()
            })
    });

}

/**
 * @desc 发起微信支付
 * @param obj {Object} 后台返回的支付信息(data);以及vue实例(vueObj)
 * @returns {Promise<any>}
 */
function towxPay(obj) {
    wx.config({
        // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId:  obj.data.data.appId, // 必填，公众号的唯一标识
        timestamp: '', // 必填，生成签名的时间戳
        nonceStr: '', // 必填，生成签名的随机串
        signature: '',// 必填，签名，见附录1
        jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });


    return new Promise((resolve, reject) => {

        wx.chooseWXPay({
            "appId": obj.data.data.appId,
            "timestamp": obj.data.data.timeStamp + '', // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            "nonceStr": obj.data.data.nonceStr, // 支付签名随机串，不长于 32 位
            "package": obj.data.data.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            "signType": obj.data.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            "paySign": obj.data.data.paySign, // 支付签名
            success(res) {
                if (res.errMsg === 'chooseWXPay:ok') {
                    // todo: 支付成功后的回调函数
                    resolve(res);
                } else {
                    window.alert('微信支付失败'+ JSON.stringify(res));
                    window.location.reload();
                }
            },
            cancel(res) {
                //window.alert('支付取消' + JSON.stringify(res));
                window.location.reload()
            },
            error(res) {
                window.alert('支付失败' + JSON.stringify(res));
                window.location.reload()
            }
        });
    })

}


/**
 * #desc 微信支付接口
 * @param vueObj {Object} vue实例
 * @param orderNo {String} 传入要付款的订单号
 */
export default function (vueObj, orderNo) {
    return new Promise ((resolve, reject) =>{
        getPayObj(vueObj, orderNo) //从后台获取订单支付信息
            .then (towxPay) //向微信发起支付请求
            .then((res) => { //微信支付请求成功后的回调
                resolve(res) ;
            })
            .catch((error) => {
                reject(error);
            })
    })
}
