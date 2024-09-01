import { Schema, model } from 'mongoose';
import { TRoom } from './room.interface';



const roomSchema = new Schema<TRoom>({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    photo: {
        type: String,
        required: [true, 'Photo is required']
    },
    extraPhoto: {
        type: String,
        required: [true, 'Extra photo is required']
    }, 
    
    category:{
        type: String,
        enum:['featured','regular'],
        required: [true, 'category is required']
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


// pre middleware for filter out deleted rooms

roomSchema.pre('find', function(next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

roomSchema.pre('findOne', function(next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Room = model<TRoom>('Room', roomSchema);
