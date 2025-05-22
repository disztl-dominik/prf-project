import mongoose, { Document, Model, Schema } from 'mongoose';

interface IWeight extends Document {
    userId: string;
    time: Date;
    weight: string;
}

const WeightSchema: Schema<IWeight> = new mongoose.Schema({
    userId: { type: String, required: true },
    time: { type: Date, required: true },
    weight: { type: String, required: true }
});

export const Weight: Model<IWeight> = mongoose.model<IWeight>('Weight', WeightSchema);