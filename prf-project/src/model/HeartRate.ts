import mongoose, { Document, Model, Schema } from 'mongoose';

interface IHeartRate extends Document {
    userId: string;
    time: Date;
    heartRate: number;
}

const HeartRateSchema: Schema<IHeartRate> = new mongoose.Schema({
    userId: { type: String, required: true },
    time: { type: Date, required: true },
    heartRate: { type: Number, required: true }
});

export const HeartRate: Model<IHeartRate> = mongoose.model<IHeartRate>('HeartRate', HeartRateSchema);