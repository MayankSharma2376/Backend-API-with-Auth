import mongoose, {Schema} from "mongoose";

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



export const User = mongoose.model("User", userSchema)