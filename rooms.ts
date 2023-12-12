import { BookingInterface } from "./bookings"

export interface RoomInterface {

    name: string
    rate: number
    discount: number

}


export class Room implements RoomInterface{

    name: string
    rate: number
    discount: number


    constructor(name:string, rate:number, discount:number){
        this.name = name,
        this.rate = rate,
        this.discount = discount
    }
}

module.exports = Room;