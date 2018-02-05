import { md5 } from 'vux'
/**
 * @desc 根据时间戳 返回同一接口需要的token
 * @param timeStamp {String}
 * @returns token {String}
 */
//密钥
let secretCode = 'joof2ph4932oich';
export default function (timeStamp) {
    return md5(secretCode + timeStamp).toUpperCase();
}
