import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_FACTOR = 10;

interface IUser extends Document {
    email: string;
    name: string;
    tel?: string;
    password: string;
    role: string;
    doctor: string;
    comparePassword: (candidatePassword: string, callback: (error: Error | null, isMatch: boolean) => void) => void;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    tel: { type: String, required: false },
    password: { type: String, required: true },
    role: { type: String, required: true },
    doctor: { type: String, required: false }
});

// hook
UserSchema.pre<IUser>('save', function(next) {
    const user = this;
    
    // hash password
    bcrypt.genSalt(SALT_FACTOR, (error, salt) => {
        if (error) {
            return next(error);
        }
        bcrypt.hash(user.password, salt, (err, encrypted) => {
            if (err) {
                return next(err);
            }
            user.password = encrypted;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword: string, callback: (error: Error | null, isMatch: boolean) => void): void {
    const user = this;
    bcrypt.compare(candidatePassword, user.password, (error, isMatch) => {
        if (error) {
            callback(error, false);
        }
        callback(null, isMatch);
    });
}

export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);