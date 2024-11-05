import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  email: { 
    type: String, 
    required: true, 
    unique: true }
    ,
  password: { 
    type: String, 
    required: true 
},
  phone: { 
    type: String, 
    required: true 
},
  profession: { 
    type: String, 
    required: true 
}
});

const userModel = mongoose.model('UserData', UserSchema);

export default userModel
