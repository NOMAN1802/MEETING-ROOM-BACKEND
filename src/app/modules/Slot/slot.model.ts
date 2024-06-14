import { Schema, model, Document, Types } from 'mongoose';
import { TSlot } from './slot.interface';



const slotSchema = new Schema<TSlot>(
    {

    room:
    { 
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true 
        },
    date:
   { 
    type: String, 
    required: true 
    },
    startTime:
   { 
    type: String, 
    required: true 
    },
    endTime: 
    {
    type: String,
    required: true
    },
    isBooked: { 
    type: Boolean,
    default: false
    },

    },
    {
    timestamps: true 
    }
    );


const Slot = model<TSlot>('Slot', slotSchema);

export default Slot;
