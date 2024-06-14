import { Schema } from 'mongoose'

export type TBooking = {
  date: string
  slots: Schema.Types.ObjectId[]
  room: Schema.Types.ObjectId
  user: Schema.Types.ObjectId
  totalAmount: number
  isConfirmed: 'unconfirmed' | 'confirmed' | 'cancelled'
  isDeleted: boolean
}

