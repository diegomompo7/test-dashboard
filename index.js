

class Room{
    constructor(name, rate, discount, booking){
        this.name = name,
        this.rate = rate,
        this.discount = discount,
        this.booking = booking
    }

    calcCent(){
        return this.rate * 100;
    }

    discountError(){
        if(this.discount < 0 || this.discount > 100){
             throw new Error("El número de descuento tiene que estar comprendido entre 0 y 100")
        } else {
            return this.discount
        }
    }

    isOcupped(date){

       return this.booking.check_in <= date && date <= this.booking.check_out

    }

    occupancyPercentaje(startDate, endDate){

        const daysRange = (endDate - startDate) / (24 * 60 * 60 * 1000)

        const lastDay = endDate > new Date(this.booking.check_out) ? new Date(this.booking.check_out) : endDate
        const firstDay  = startDate > new Date(this.booking.check_in) ? startDate : new Date(this.booking.check_in)

        const ocupDays = (lastDay - firstDay) / (24 * 60 * 60 * 1000)

        return  ((ocupDays * 100) / daysRange).toFixed(2)
    }

    static totalOccupancyPorcentaje(rooms, startDate, endDate){

        const daysRange = (endDate - startDate) / (24 * 60 * 60 * 1000).toFixed(0)
        let ocupDays = 0;

        rooms.forEach(element => {
            const lastDay = endDate > new Date(element.booking.check_out) ? new Date(element.booking.check_out) : endDate
            const firstDay  = startDate > new Date(element.booking.check_in) ? startDate : new Date(element.booking.check_in)

            ocupDays += ((lastDay - firstDay) / (24 * 60 * 60 * 1000))
    
        });

        return  ((ocupDays * 100) / daysRange.toFixed(0)).toFixed(2)

    }

    static occupancyPorcentaje(rooms, startDate, endDate){
    
        let availableRooms = []

        rooms.forEach(element => {
            if(startDate > new Date(element.booking.check_out) || endDate < new Date(element.booking.check_in)){
                availableRooms.push(element.name)
            }
    
        });


        return availableRooms


    }
}



class Booking{
    constructor(name, email, check_in, check_out, discount, room){
        this.name = name,
        this.email = email,
        this.check_in = check_in,
        this.check_out = check_out,
        this.discount = discount,
        this.room = room
    }

    discountError(){
        if(this.discount < 0 || this.discount > 100){
             throw new Error("El número de descuento tiene que estar comprendido entre 0 y 100")
        } else {
            return this.discount
        }
    }

    getFee(){

        const onCent = this.room.rate * 100

        const discountRoom = onCent - (onCent * (this.room.discount / 100))

        const discountFinal = discountRoom - (discountRoom * (this.discount / 100))

        return discountFinal

    }
}

module.exports = {Room, Booking};
