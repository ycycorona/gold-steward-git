String openId = "oWwFQw-FqknWMh8BEZwnUfzd5HGY";

用户查询个人的订单列表:
http://localhost:8080/wxmp/luggage/wx/toMyOrderList.do?code=1
创建订单：
http://localhost:8080/wxmp/luggage/wx/createOrder.do

sendCity:青岛市
sendAddress:市南区asdfasdf
sendTime:2017-08-23 10:41
takeCity:青岛市
takeAddress:飞机场-流亭机场
takeTime:2017-08-23 10:41
luggageNumber:1
luggageUnitPrice:39
insurancePrice:5
insuranceAmount:500
preferentialPrice:0
orderPrice:44
remark:asdfasdf
needInvoice:1
customerName:ycy
customerMobile:15689951025

跳转到订单创建页面：
http://localhost:8080/wxmp/luggage/wx/toCreateOrderPage.do?code=1
订单明细页面：
http://localhost:8080/wxmp/luggage/wx/toOrderDetailPage.do?orderNo=2017080160&code=1

