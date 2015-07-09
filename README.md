# paypal-ap-parser
Parser to convert PayPal Adaptive Payments PayResponse into javascript object hierarchy.

EG: Converts

    paymentInfoList.paymentInfo(0).receiver.amount=12.00
		&paymentInfoList.paymentInfo(0).receiver.paymentType=SERVICE
		&paymentInfoList.paymentInfo(1).receiver.email=me%40website.com

To 

    {
        paymentInfoList: {
            PaymentInfo: [
              {
                 receiver: {
                     amount: 12.0,
                     paymentType: "SERVICE"
                 }
              },
              {
                receiver: {
                  email: "me@website.com"
                }
              }
            ] 
        }
    }
