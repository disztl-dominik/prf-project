import mongoose, { Document, Model, Schema } from 'mongoose';

interface IBloodPressure extends Document {
    userId: string;
    time: Date;
    bloodPressure: string;
}

const BloodPressureSchema: Schema<IBloodPressure> = new mongoose.Schema({
    userId: { type: String, required: true },
    time: { type: Date, required: true },
    bloodPressure: { type: String, required: true }
});

export const BloodPressure: Model<IBloodPressure> = mongoose.model<IBloodPressure>('BloodPressure', BloodPressureSchema);