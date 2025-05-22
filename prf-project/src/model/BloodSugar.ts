import mongoose, { Document, Model, Schema } from 'mongoose';

interface IBloodSugar extends Document {
    userId: string;
    time: Date;
    bloodSugar: string;
}

const BloodSugarSchema: Schema<IBloodSugar> = new mongoose.Schema({
    userId: { type: String, required: true },
    time: { type: Date, required: true },
    bloodSugar: { type: String, required: true }
});

export const BloodSugar: Model<IBloodSugar> = mongoose.model<IBloodSugar>('BloodSugar', BloodSugarSchema);