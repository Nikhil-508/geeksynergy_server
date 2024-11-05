import userModel from '../Model/UserSchema.js';
import bcrypt from 'bcrypt';

export const RegisterUser = async (req, res) => {
    try {
        const { name, email, password, phone, profession } = req.body;

        // Check if user already exists
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);
        
        const newUser = new userModel({
            name,
            email,
            password: hashPassword,
            phone,
            profession
        });

        
        await newUser.save();
        
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};


export const LoginUser = async (req, res) => {
    try {
        console.log("loginnnn");
        
        const { email,password } = req.body
        const user = await userModel.findOne({email})
        if(user && await bcrypt.compare(password,user.password)){
            res.json({message : "login successful",user})
        }else{
            res.status(400).json({message : "invalid credentials"})
        }
    } catch (error) {
        res.status(500).json({message : "error loginn"})
    }
}

export const getHome = async (req,res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error in fetch', error: error.message });
    }
};


export const deleteUser = async (req,res) => {
    try {
        const userId = req.params.userId
        console.log(userId,"idd");
        await userModel.findByIdAndDelete(userId)
        console.log("dletee")
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error in deleting', error: error.message });
    }
};


export const getEditUser = async (req,res) => {
    try {
        console.log("eidtttt");
        const userId = req.params.id;
        console.log(userId, "editiddd");
        const user = await userModel.findById(userId);
        res.json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).send('Server Error');
    }
};

export const editUser = async (req,res) => {
    try {
        const FormData = req.body
        const userId = req.params.id
        console.log(userId,"editiddd");
        await userModel.findByIdAndUpdate(userId,FormData,{new:true})
        console.log("updatedd");
        
        res.status(200).json({message:"user updatedd"})
        
    } catch (error) {
        console.log("edit erorr",error);
        res.status(500).json({message:error.message})
    }
}
