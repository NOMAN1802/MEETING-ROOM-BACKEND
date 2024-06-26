import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import { TSlot } from "./slot.interface"
import { minutesToTimeConvert, slotSearchableFields, timeToMinutesConvert } from "./slot.utils"
import { Room } from "../Room/room.model"
import Slot from "./slot.model"
import QueryBuilder from "../../builder/QueryBuilder"


const createSlotIntoDB = async (payload: TSlot) => {
  const { room, date, startTime, endTime } = payload;

  const slotDuration = 60;
  const startMinutes = timeToMinutesConvert(startTime);
  const endMinutes = timeToMinutesConvert(endTime);

  const totalDuration = endMinutes - startMinutes;
  const numberOfSlots = totalDuration / slotDuration;

  if (totalDuration <= 0) {
      throw new AppError(httpStatus.BAD_REQUEST, `Start time ${startTime} should be less than end time ${endTime}`);
  }

  const isRoomExists = await Room.findById(room);
  if (!isRoomExists) {
      throw new AppError(httpStatus.BAD_REQUEST, "Room Not Found");
  }

  const slots = [];
  for (let i = 0; i < numberOfSlots; i++) {
      const slotStartTime = startMinutes + i * slotDuration;
      const slotEndTime = slotStartTime + slotDuration;

      const newSlot = {
          room,
          date,
          startTime: minutesToTimeConvert(slotStartTime),
          endTime: minutesToTimeConvert(slotEndTime),
          isBooked: false
      };

      const isSlotExists = await Slot.findOne({
          room,
          date,
          startTime: newSlot.startTime,
          endTime: newSlot.endTime
      });

      if (isSlotExists) {
          throw new AppError(httpStatus.BAD_REQUEST, `Slot already exists form ${newSlot?.startTime} to ${newSlot?.endTime}`);
      }

      slots.push(newSlot);
  }

  const result = await Slot.insertMany(slots);

  return result;
};

const getAvailableSlotsFromDB = async (date: string, roomId: string) => {
        let query = {};

        if (date && roomId) {
            query = { $and: [{ date }, { room: roomId }, { isBooked: false }] };
        } else {
            query = { isBooked: false };
        }

        const availableSlotQuery = new QueryBuilder(Slot.find().populate('room'), query)
            .filter()
            .search(slotSearchableFields)
            .fields()
            .sort()
            .paginate();

        const result = await availableSlotQuery.modelQuery;

        if (result.length <= 0) {
            throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
        }

        return result;
   
};

    
export const slotServices = {
    createSlotIntoDB,
    getAvailableSlotsFromDB
   
  };
  