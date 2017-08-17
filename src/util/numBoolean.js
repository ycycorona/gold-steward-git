/**
 * @param Boolean {int,String}
 * @returns {Boolean}
 */
function BooleanToNum(Boolean) {
  var flag = 0;
  if (Boolean === true){
    flag = 1;
  }else{
    flag = 0;
  }
  return flag;
}
/*module.exports = numToBoolean;*/
module.exports = BooleanToNum;
