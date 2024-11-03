const Users = require("../models/usersModel");
const Messages = require("../models/messagesModel");

const createMessage = async (req, res) => {
    try{
        const {userName,message}=req.body;
        const getUserId = await Users.findOne({userName:userName,isDeleted:false});
        if(getUserId){
            const newMessage =await Messages.create({userId:getUserId._id,message});
            if(newMessage){
                return res.status(200).json({success:true,message:"Message created successfully",data:newMessage});
            }
            else{
                return res.status(500).json({success:false,message:"Message creation failed",data:null});
            }
        }
        else{
            return res.status(404).json({success:false,message:"User not found",data:null});
        }
    }
    catch(err){
        return res.status(500).json({success:false,message:"Internal server error"+err,data:null});
    }
};
const getMessages = async (req, res) => {
    try{
        const userId = req.body._id;
        const getUserId = await Users.find({_id:userId});
        if(getUserId){
            const messages = await Messages.find({userId:userId,isDeleted:false});
            if(messages){
                return res.status(200).json({success:true,message:"Messages fetched successfully",data:messages});
            }
            else{
                return res.status(404).json({success:false,message:"Messages not found",data:null});
            }
        }
        else{
            return res.status(404).json({success:false,message:"User not found",data:null});
        }
    }
    catch(err){
        return res.status(500).json({success:false,message:"Internal server error"+err,data:null});
    }
};
const deleteMessage = async (req, res) => {
    try {
        const messageId = req.params.id;
        const userId = req.body._id;
        const message = await Messages.findOneAndUpdate({_id:messageId,userId:userId},{isDeleted:true});
        if(message){
            return res.status(200).json({success:true,message:"Message deleted successfully",data:message});
        }
        else{
            return res.status(404).json({success:false,message:"Message not found",data:null});
        }
        
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal server error"+error,data:null});
        
    }
};

module.exports = {createMessage, getMessages, deleteMessage};