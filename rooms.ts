import { BookingInterface } from "./bookings"

export interface RoomInterface {

    name: string
    rate: number
    discount: number
    booking: BookingInterface

}


export class Room implements RoomInterface{

    name: string
    rate: number
    discount: number
    booking: BookingInterface


    constructor(name:string, rate:number, discount:number, booking:BookingInterface){
        this.name = name,
        this.rate = rate,
        this.discount = discount,
        this.booking = booking
    }

    calcCent():number{
        return this.rate * 100;
    }

    discountError():string|number{
        if(this.discount < 0 || this.discount > 100){
             throw new Error("El número de descuento tiene que estar comprendido entre 0 y 100")
        } else {
            return this.discount
        }
    }

    isOcupped(date:Date):boolean{

       return this.booking.check_in <= date && date <= this.booking.check_out

    }

    occupancyPercentaje(startDate:Date, endDate:Date):string{

        const daysRange = (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)

        const lastDay = endDate > new Date(this.booking.check_out) ? new Date(this.booking.check_out) : endDate
        const firstDay  = startDate > new Date(this.booking.check_in) ? startDate : new Date(this.booking.check_in)

        const ocupDays = (lastDay.getTime() - firstDay.getTime()) / (24 * 60 * 60 * 1000)

        return  ((ocupDays * 100) / daysRange).toFixed(2)
    }

    static totalOccupancyPorcentaje(rooms: Room[], startDate:Date, endDate:Date):string{

        const daysRange  = (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
        let ocupDays = 0;

        rooms.forEach(element => {
            const lastDay = endDate > new Date(element.booking.check_out) ? new Date(element.booking.check_out) : endDate
            const firstDay  = startDate > new Date(element.booking.check_in) ? startDate : new Date(element.booking.check_in)

            ocupDays += ((lastDay.getTime() - firstDay.getTime()) / (24 * 60 * 60 * 1000))
    
        });

        return  ((ocupDays * 100) / daysRange).toFixed(2)

    }

    static occupancyPorcentaje(rooms: Room[], startDate:Date, endDate:Date):any[]{
    
        let availableRooms: string[] = [];

        rooms.forEach(element => {
            if(startDate > new Date(element.booking.check_out) || endDate < new Date(element.booking.check_in)){
                availableRooms.push(element.name)
            }
    
        });


        return availableRooms


    }
}

module.exports = Room;