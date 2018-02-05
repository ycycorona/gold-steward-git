//_userInfoObj(au) 和openId会在jsp中传入
let _userInfoObj = {}; //常旅客信息

if(process.env.NODE_ENV === 'development') {
    _userInfoObj = {
        "resultCode": "00",
        "resultMsg": "OK",
        "userId": "bb9d20deda0b89525634eabfdc81ad1f32eb11f9c1b65fac37763efe44c9dff6",
        "loginName": "wsh286@sina.com",
        "loginMobile": "18315420360",
        "loginDocumentno": "371323198906180194",
        "userType": "P",
        "title": null,
        "surnameCn": "王",
        "firstnameCn": "硕",
        "surnameEn": "Wang",
        "firstnameEn": "Shuo",
        "sex": "M",
        "nationality": "CN",
        "birthday": "1989-06-18",
        "company": "",
        "department": null,
        "position": "",
        "useCreditCard": "0",
        "memo": "3",
        "audited": null,
        "language": null,
        "friendship": null,
        "clkId": "018866206906",
        "clkpwd": null,
        "bmail": "0",
        "detailAddress": "",
        "postcode": "",
        "companyName": "",
        "companyAddress": "",
        "profession": "",
        "income": "",
        "frequency": "",
        "preference": "",
        "commonTransport": "",
        "timestamp": 1516586370,
        "document": [{"documentType": "NI", "documentNo": "371323198906180194"}],
        "openId": 123456
    }
} else if (process.env.NODE_ENV === 'production') {
    _userInfoObj = au;
    _userInfoObj.openId = openId //每个微信用户关注公众号生成的一个固定id
}
export default _userInfoObj;
