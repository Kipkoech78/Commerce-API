
const adress = require('../../models/adress')
// const Adress = require('../../models/adress')

const addAddress = async (req, res) =>{
    try{
        const {userId, address, city, pinCode, phone, notes} = req.body
        if(!userId || !address || !city || !pinCode || !phone || !notes){
            return res.status(400).json({
                success: false,
                message: "Invalid data provided"
                
            })
        }
        const newlyCreatedAdress = new adress({
            userId, address, city, pinCode, phone, notes
        })
        await newlyCreatedAdress.save()
        res.status(201).json({
            success: true,
            message: "data saved Successfuly",
            data: newlyCreatedAdress
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "error"
        })
    }
}
const fetchAllAdress = async (req, res) =>{
    try{
        const {userId} = req.params
        if(!userId){
            return res.status(400).json({
                success: false,
                message:'no userId Passed'
            })
        }
        const adressList = await adress.find({userId})
        res.status(200).json({
            success:true,
            data: adressList
        })

    }catch(err){
        console.log(e)
        res.status(500).json({
            success: false,
            message: "error"
        })
    }
}

const editAdress = async (req, res) => {
    try {
      const { userId, addressId } = req.params;
      const formData = req.body;
      console.log( userId, "userId from frontEnd")
      console.log( addressId, "Address Id from frontEnd")
  
      if (!userId || !addressId) {
        return res.status(400).json({
          success: false,
          message: "User and address id is required!",
        });
      }
      const address = await adress.findOneAndUpdate(
        {
          _id: addressId,
          userId,
        },
        
        formData,
        { new: true }
      );
      console.log(formData, "form data")
      if (!address) {
        return res.status(404).json({
          success: false,
          message: "Address not found",
        });
      }
  
      res.status(200).json({
        success: true,
        data: address,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  };

const deleteAdress = async (req, res) =>{
    try{
        const {userId, addressId} = req.params
        if(!userId || !addressId){
            return res.status(400).json({
                success:false,
                message:"input both user address and addressId"
            })
        }
        const Address = await adress.findOneAndDelete({
            _id: addressId, userId
        })
        if(!Address){
            return res.status(404).json({
                success:false,
                message:'address not found'
            })
        }
        res.status(200).json({
            success:true,
            message:"deleted sucessfuly"
        })

    }catch(err){
        console.log(e)
        res.status(500).json({
            success: false,
            message: "error"
        })
    }
}




module.exports = { addAddress, fetchAllAdress, editAdress, deleteAdress }