import { BookingInterface } from "./bookings"

export interface RoomInterface {

    name: string
    rate: number
    discount: number
    booking: BookingInterface | null

}

export class Room implements RoomInterface{

    name: string
    rate: number
    discount: number
    booking: BookingInterface | null


    constructor(name:string, rate:number, discount:number, booking: BookingInterface | null){
        this.name = name,
        this.rate = rate,
        this.discount = discount,
        this.booking = booking
    }

    calcCent(): number{
        return this.rate * 100;
    }

    discountError(): number | string {
        if(this.discount < 0 || this.discount > 100){
             throw new Error("El número de descuento tiene que estar comprendido entre 0 y 100")
        } else {
            return this.discount
        }
    }

    isOcupped(date:Date):boolean{

        if (this.booking) {
            return new Date(this.booking.check_in) <= date && date <= new Date(this.booking.check_out);
        }
        return false;

    }

    occupancyPercentaje(startDate:Date, endDate:Date):string{

        if (this.booking) {
            const daysRange: number = (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000);
            const lastDay: Date = endDate > new Date(this.booking.check_out) ? new Date(this.booking.check_out) : endDate;
            const firstDay: Date = startDate > new Date(this.booking.check_in) ? startDate : new Date(this.booking.check_in);
            const ocupDays: number = (lastDay.getTime() - firstDay.getTime()) / (24 * 60 * 60 * 1000);
            return ((ocupDays * 100) / daysRange).toFixed(2);
        }
        return "0.00";
    }

    static totalOccupancyPorcentaje(rooms: RoomInterface[], startDate:Date, endDate:Date){

        const daysRange: number = (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000);
        let ocupDays = 0;

        rooms.forEach(element => {
            if (element.booking) {
                const lastDay = endDate > new Date(element.booking.check_out) ? new Date(element.booking.check_out) : endDate;
                const firstDay = startDate > new Date(element.booking.check_in) ? startDate : new Date(element.booking.check_in);
                ocupDays += (lastDay.getTime() - firstDay.getTime()) / (24 * 60 * 60 * 1000);
            }
        });

        return ((ocupDays * 100) / daysRange).toFixed(2);

    }

    static occupancyPorcentaje(rooms: RoomInterface[], startDate:Date, endDate:Date):string[]{
    
        let availableRooms: string[] = [];

        rooms.forEach(element => {
            if (!element.booking || startDate > new Date(element.booking.check_out) || endDate < new Date(element.booking.check_in)) {
                availableRooms.push(element.name);
            }
        });

        return availableRooms;

    }
}


export default Room;