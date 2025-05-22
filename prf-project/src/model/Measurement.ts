import mongoose, { Document, Model, Schema } from 'mongoose';

interface IMeasurement extends Document {
    time: Date;
    bloodPressure: number;
    heartRate: number;
    bloodSugar: number;
    weight: number;
}

const MeasurementSchema: Schema<IMeasurement> = new mongoose.Schema({
    time: { type: Date, required: true },
    bloodPressure: { type: Number, required: false },
    heartRate: { type: Number, required: false },
    bloodSugar: { type: Number, required: false },
    weight: { type: Number, required: true }
});

export const Measurement: Model<IMeasurement> = mongoose.model<IMeasurement>('Measurement', MeasurementSchema);