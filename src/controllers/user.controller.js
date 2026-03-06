import { User } from "../models/user.model";

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
            res.status(400).json({message: "User already exists"})
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
            message: "Internal Server Error", err: "Error Message"
        })

    }

}


export {
    registerUser
}