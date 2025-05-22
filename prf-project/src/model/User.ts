import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_FACTOR = 10;

interface IUser extends Document {
    _id: { type: mongoose.Schema.Types.Mixed, required: true },
    email: string;
    name?: string;
    address?: string;
    nickname?: string;
    password: string;
    doctor: string;
    comparePassword: (candidatePassword: string, callback: (error: Error | null, isMatch: boolean) => void) => void;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.Mixed, required: true },
    email: { type: String, required: true },
    name: { type: String, required: false },
    address: { type: String, required: false },
    nickname: { type: String, required: false },
    password: { type: String, required: true },
    doctor: { type: String, required: false },
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