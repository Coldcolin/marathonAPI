require('dotenv').config();
const userModel = require("../model/userModel");
const crypto = require('crypto');
const secret = process.env.SECRET_KEY;

const signUp = async (req, res) => {
    try{
            const user = new userModel({
                firstName: req.body.firstName.trim(),
                lastName: req.body.lastName.trim(),
                DOB:req.body.DOB.trim(),
                Sex:req.body.Sex.trim(),
                Status:req.body.Status.trim(),
                Phone: req.body.Phone.trim(),
                email: req.body.email.trim(),
                Address:req.body.Address,
                LGA: req.body.LGA,
                Ward: req.body.Ward,
                State: req.body.State,
                StateLGA: req.body.StateLGA,
                EmergencyFirstName: req.body.EmergencyFirstName.trim(),
                EmergencyRelationship: req.body.EmergencyRelationship.trim(),
                EmergencyLastName: req.body.EmergencyLastName.trim(),
                EmergencyPhone: req.body.EmergencyPhone.trim(),
                Category: req.body.Category.trim(),
                shirt: req.body.shirt.trim(),
                reference: req.body.reference,
                paymentStatus: req.body.paymentStatus,
            });

            await user.save();
            
            res.status(200).json({message: "registration successful"})

            

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error: " + error.message,
        })
    };
}


const getUsers= async(eq, res)=>{
    try{
        const users = await userModel.find().select('firstName lastName DOB Sex Status Phone email Address LGA Ward State StateLGA EmergencyFirstName EmergencyRelationship EmergencyLastName EmergencyPhone Category shirt')

        res.status(200).json({data: users})
    }catch(error){
        return res.status(500).json({
            message: "Internal server error: " + error.message,
        })
    }
}

// {
//     "event": "charge.success",
//     "data": {
//       "id": 302961,
//       "domain": "live",
//       "status": "success",
//       "reference": "qTPrJoy9Bx",
//       "amount": 10000,
//       "message": null,
//       "gateway_response": "Approved by Financial Institution",
//       "paid_at": "2016-09-30T21:10:19.000Z",
//       "created_at": "2016-09-30T21:09:56.000Z",
//       "channel": "card",
//       "currency": "NGN",
//       "ip_address": "41.242.49.37",
//       "metadata": 0,
//       "log": {
//         "time_spent": 16,
//         "attempts": 1,
//         "authentication": "pin",
//         "errors": 0,
//         "success": false,
//         "mobile": false,
//         "input": [],
//         "channel": null,
//         "history": [
//           {
//             "type": "input",
//             "message": "Filled these fields: card number, card expiry, card cvv",
//             "time": 15
//           },
//           {
//             "type": "action",
//             "message": "Attempted to pay",
//             "time": 15
//           },
//           {
//             "type": "auth",
//             "message": "Authentication Required: pin",
//             "time": 16
//           }
//         ]
//       },
//       "fees": null,
//       "customer": {
//         "id": 68324,
//         "first_name": "BoJack",
//         "last_name": "Horseman",
//         "email": "bojack@horseman.com",
//         "customer_code": "CUS_qo38as2hpsgk2r0",
//         "phone": null,
//         "metadata": null,
//         "risk_action": "default"
//       },
//       "authorization": {
//         "authorization_code": "AUTH_f5rnfq9p",
//         "bin": "539999",
//         "last4": "8877",
//         "exp_month": "08",
//         "exp_year": "2020",
//         "card_type": "mastercard DEBIT",
//         "bank": "Guaranty Trust Bank",
//         "country_code": "NG",
//         "brand": "mastercard",
//         "account_name": "BoJack Horseman"
//       },
//       "plan": {}
//     }
//   }


const webHook = async (req, res) => {
    try{
        const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
        if (hash == req.headers['x-paystack-signature']) {
        // Retrieve the request's body
        const event = req.body;
  
            if (event.event === 'charge.success') {
                const user = await userModel.find().where("reference").equals(`${event.data.reference}`)
            // You can also perform additional actions here, like updating your database
                user.paymentStatus = "Payment Confirmed"
                await user.save()
            }
        }


    res.send('Webhook received');
    }catch(error){
        return res.status(500).json({
            message: "Internal server error: " + error.message,
        })
    }
  };

module.exports={
    signUp,
    getUsers,
    webHook
}