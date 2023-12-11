import { RoomInterface } from "./rooms"


export interface BookingInterface {

    name: string
    email:string
    check_in:Date
    check_out:Date
    discount:number
    room: RoomInterface

}

export class Booking{
    name: string
    email:string
    check_in:Date
    check_out:Date
    discount:number
    room: RoomInterface
    constructor(name: string, email:string, check_in:Date, check_out:Date, discount:number, room:RoomInterface){
        this.name = name,
        this.email = email,
        this.check_in = check_in,
        this.check_out = check_out,
        this.discount = discount,
        this.room = room
    }

    discountError():string|number{
        if(this.discount < 0 || this.discount > 100){
             throw new Error("El número de descuento tiene que estar comprendido entre 0 y 100")
        } else {
            return this.discount
        }
    }

    getFee():number{

        const onCent = this.room.rate * 100

        const discountRoom = onCent - (onCent * (this.room.discount / 100))

        const discountFinal = discountRoom - (discountRoom * (this.discount / 100))

        return discountFinal

    }
}

module.exports =  Booking;