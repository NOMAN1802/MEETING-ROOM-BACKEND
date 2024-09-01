export type TRoom =  {
    name: string;
    photo: string; 
    extraPhoto:string;
    category: 'featured'| 'regular';
    roomNo: number; 
    floorNo: number; 
    capacity: number; 
    pricePerSlot: number; 
    amenities: string[];  
    isDeleted?: boolean; 
}
