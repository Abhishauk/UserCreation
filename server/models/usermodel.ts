// usermodel.ts

import mongoose, { Schema, Document } from 'mongoose';

// Define the schema
const userSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    retypePassword: { type: String, required: true },
    contactMode: { type: String, required: true },
    email: { type: String, required: true },
    verified: {type: Boolean},
    otp: {type:Number}
});

// Define the model
export interface UserDocument extends Document {
    firstName: string;
    lastName: string;
    password: string;
    retypePassword: string;
    contactMode: string;
    email: string;
    verified:Boolean;
    otp:Number;
}

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
