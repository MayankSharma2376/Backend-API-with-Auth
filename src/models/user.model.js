import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, // lilly whitespace
            minLength: 1,
            maxLength: 30 
        },

        password: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 12,



        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            required: true
        }
    },
    {
        timestamps: true
    }
)

// before save password we have to hash it using bcrypt 

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
        this.password = await bcrypt.hash(this.password, 10)
        next();
    }

})



// comparing the password 


userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)

}



export const User = mongoose.model("User", userSchema)