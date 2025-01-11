import mongoose, { Schema , Document } from "mongoose";
export interface IUser extends Document {
    email: string; 
    password: string; 
}
const userSchema: Schema = new Schema({
    email: {type: String, require: true},
    password: {type: String, required: true},
})

const UserModel = mongoose.model<IUser>("userSchema",userSchema)
export default UserModel;