/**
 * @param type {String} 寄收类型 send receive
 * @param time {String} 时间字符串
 * @returns {Object}
 * errorType 0：无错误；1：时间比当前早；2：送货时间小于12:00；3：客户取货时间早于16:00
 */
function validateTime(type, time) {
    //debugger;
    let timeArray = time.trim().split(' ');
    let dayStart = timeArray[0] + 'T' + '00:00:00+08:00';
    let sendLimit = timeArray[0] + 'T' + '12:00:00+08:00';
    let receiveLimit =timeArray[0] + 'T' + '16:00:00+08:00';
    let receiveLimit_1 =timeArray[0] + 'T' + '21:00:00+08:00';

    let timeObj = new Date(timeArray[0] + 'T' + timeArray[1] + '+08:00');
    let dayStartObj = new Date(dayStart);
    let sendLimitObj = new Date(sendLimit);
    let receiveLimitObj = new Date(receiveLimit);
    let receiveLimitObj_1 = new Date(receiveLimit_1);
    let nowObj = new Date();

    let flag_1 = true;
    let flag_2 = true;

    let errorMsg = '';

    if (type === 'send'){
        flag_1 = timeObj.valueOf() <= sendLimitObj.valueOf();
        if (!flag_1) {
            errorMsg = '寄送时间不能晚于12:00！';
        }
    } else if (type === 'receive'){
        flag_1 = timeObj.valueOf() >= receiveLimitObj.valueOf() && timeObj.valueOf() <= receiveLimitObj_1.valueOf();
        if (!flag_1) {
            errorMsg = '客户取货时间不能早于16:00和大于21:00！';
        }
    } else {
        return false;
    }

    //不能早于现在
    if (timeObj.valueOf() < nowObj.valueOf()) {
        flag_2 = false;
        errorMsg = errorMsg + '寄送和取货时间不能早于当前时间!';
    }
    return {
        flag: (flag_1 && flag_2),
        errorMsg: errorMsg
    }
}
//console.log(validateTime('send', '2017-12-16 15:41'))
module.exports = validateTime;
