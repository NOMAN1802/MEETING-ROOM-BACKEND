import { TRoom } from "./room.interface";
import { Room } from "./room.model";


const createRoomIntoDB = async(payload: TRoom)=>{
    const result = await Room.create(payload);
    return result;
};

const getSingleRoomFromDB = async(id: string)=>{
    const result  = await Room.findById(id);
    return result;
};

const getAllRoomFromDB = async()=>{

    const result  = await Room.find();
    return result;
};


const updateRoomIntoDB = async (id: string, payload: Partial<TRoom>) => {
    const { amenities, ...roomRemainingData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = {
        ...roomRemainingData
    };

    let amenitiesUpdate = {};
    if (amenities && amenities.length) {
        amenitiesUpdate = {
            $addToSet: { amenities: { $each: amenities } }
        };
    }

    const updateData = {
        $set: modifiedUpdatedData,
        ...amenitiesUpdate
    };

    const result = await Room.findByIdAndUpdate(
        id,
        updateData,
        {   
            upsert: true,
            runValidators: true,
            new: true,  
        }
    );

    return result;
};

export const roomServices = {
    createRoomIntoDB,
    getSingleRoomFromDB,
    getAllRoomFromDB,
    updateRoomIntoDB,
} 
