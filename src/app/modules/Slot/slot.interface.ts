import { Types } from 'mongoose';

export type  TSlot = {
    room: Types.ObjectId;  
    date: Date;           
    startTime: string;    
    endTime: string;      
    isBooked: boolean; 
};

export type TSchedule = {
    startTime: string;
    endTime: string;
  };


