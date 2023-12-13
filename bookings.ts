import { RoomInterface } from "./rooms"


export interface BookingInterface {

    name: string
    email:string
    check_in:string
    check_out:string
    discount:number
    room: RoomInterface | null;

}

export class Booking{
    name: string
    email:string
    check_in:string
    check_out:string
    discount:number
    room: RoomInterface | null
    constructor(name: string, email:string, check_in:string, check_out:string, discount:number, room:RoomInterface | null){
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
        
        if (!this.room) {
            throw new Error("Booking must have a room assigned for calculating the fee.");
        }

        const onCent: number = this.room.rate * 100

        const discountRoom: number = onCent - (onCent * (this.room.discount / 100))

        const discountFinal: number = discountRoom - (discountRoom * (this.discount / 100))

        return discountFinal

    }
}

export default Booking;