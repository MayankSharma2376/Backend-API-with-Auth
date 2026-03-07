import { User } from "../models/user.model.js";

const registerUser = async(req, res)=>{
    try {
        const {username, email, password} = req.body;

        // basic validation

        if(!username || !email || !password){
            return res.status(400).json({message: "All fields are important!!"})
        }

        // check if user already exist

        const existing = await User.findOne({
            email: email.toLowerCase()
        })

        if(existing){
           return res.status(400).json({message: "User already exists"})
        }



        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false

        })


        res.status(200).json({
            message: "User Registered",
            user: {id: user._id, email : user.email, username: user.username}
        })



    }catch(err){
        res.status(500).json({
            message: "Internal Server Error"
        })

    }

}



const loginUser = async(req, res)=>{
    try{

        // checking if user already exists

        const {email, password} = req.body

        const user = await User.findOne({
            email: email.toLowerCase()
        })


        if(!user){
            return res.status(400).json({
                message: "User Not Found"
            })
        }


        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({
            message: "Invalid Credentials"
        })

        res.status(200).json({
            message: "User LoggedIn",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })



        



    }catch(err){

        res.status(500).json({
            message: "Internal Server Error"
        })

    }
}


const logoutUser = async(req, res)=>{
    try{
        const {email} = req.body
        const user = await User.findOne({
            email
        })

        if(!user){
            return res.status(404).json({
                message: "User Not Found"
            })
        }

        res.status(200).json({
            message: "LoggedOut Successfully"
        })

    }catch(err){
        res.status(500).json({
            messgae: "Interal Server Error"
        })

    }
}

export {
    registerUser,
    loginUser,
    logoutUser
}