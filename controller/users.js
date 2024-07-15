const userModel = require("../model/userModel")

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
        const users = await userModel.find();

        res.status(200).json({data: users})
    }catch(error){
        return res.status(500).json({
            message: "Internal server error: " + error.message,
        })
    }
}
module.exports={
    signUp,
    getUsers
}