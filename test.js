var paypalPayResponseParser = require('./paypalPayResponseParser.js');
	
exports.parse_SingleEntry_Succeeds = function(test) {
	var result = paypalPayResponseParser.parse(
		'paymentInfoList.paymentInfo(0).receiver.amount=12.00' 
		+ '&paymentInfoList.paymentInfo(0).receiver.paymentType=SERVICE'
		+ '&paymentInfoList.paymentInfo(1).receiver.email=paypal%40trymarketspace.com'
		);
	test.expect(18);

	test.notEqual(null, result);
	test.notEqual(undefined, result);
	test.notEqual(null, result.paymentInfoList);
	test.notEqual(undefined, result.paymentInfoList);
	test.notEqual(null, result.paymentInfoList.paymentInfo);
	test.notEqual(undefined, result.paymentInfoList.paymentInfo);
	test.equal(2, result.paymentInfoList.paymentInfo.length);

	test.notEqual(null, result.paymentInfoList.paymentInfo[0]);
	test.notEqual(undefined, result.paymentInfoList.paymentInfo[0]);
	test.notEqual(null, result.paymentInfoList.paymentInfo[0].receiver);
	test.notEqual(undefined, result.paymentInfoList.paymentInfo[0].receiver);
	test.equal(12.00, result.paymentInfoList.paymentInfo[0].receiver.amount);
	test.equal("SERVICE", result.paymentInfoList.paymentInfo[0].receiver.paymentType);

	test.notEqual(null, result.paymentInfoList.paymentInfo[1]);
	test.notEqual(undefined, result.paymentInfoList.paymentInfo[1]);
	test.notEqual(null, result.paymentInfoList.paymentInfo[1].receiver);
	test.notEqual(undefined, result.paymentInfoList.paymentInfo[1].receiver);
	test.equal("paypal@trymarketspace.com", result.paymentInfoList.paymentInfo[1].receiver.email);

	test.done();
}

exports.parseItem_SingleEntry_Succeeds = function(test) {
	var initialObject = { daniel: "hello" };
	var result = paypalPayResponseParser.parseItem('paymentInfoList.paymentInfo(0).receiver.amount=12.00', initialObject );
	test.expect(13);

	test.notEqual(null, result);
	test.notEqual(undefined, result);
	test.notEqual(null, result.paymentInfoList);
	test.notEqual(undefined, result.paymentInfoList);
	test.notEqual(null, result.paymentInfoList.paymentInfo);
	test.notEqual(undefined, result.paymentInfoList.paymentInfo);
	test.equal(1, result.paymentInfoList.paymentInfo.length);
	test.notEqual(null, result.paymentInfoList.paymentInfo[0]);
	test.notEqual(undefined, result.paymentInfoList.paymentInfo[0]);
	test.notEqual(null, result.paymentInfoList.paymentInfo[0].receiver);
	test.notEqual(undefined, result.paymentInfoList.paymentInfo[0].receiver);
	test.equal("12.00", result.paymentInfoList.paymentInfo[0].receiver.amount);
	test.equal("hello", result.daniel);

	test.done();
}
