import mongoose, { Schema , Document } from "mongoose";
export interface ISeller extends Document {
    name : string; 
    rating : string;
    review: string; 
}
const sellerSchema: Schema = new Schema({
    name: {type: String, require: true},
    rating: {type: String},
    review: {type: String},
})

const SellerModel = mongoose.model<ISeller>("seller", sellerSchema);

export default SellerModel;