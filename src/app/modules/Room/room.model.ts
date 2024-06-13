import { Schema, model } from 'mongoose';
import { TRoom } from './room.interface';



const roomSchema = new Schema<TRoom>({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    roomNo: {
        type: Number,
        required: [true, 'Room number is required'],
        unique: true
    },
    floorNo: {
        type: Number,
        required: [true, 'Floor number is required']
    },
    capacity: {
        type: Number,
        required: [true, 'Capacity is required']
    },
    pricePerSlot: {
        type: Number,
        required: [true, 'Price per slot is required']
    },
    amenities: {
        type: [String],
        required: [true, 'Amenities are required']
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export const Room = model<TRoom>('Room', roomSchema);
