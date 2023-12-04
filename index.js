

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
        if(this.rate < 0 || this.rate > 100){
             throw new Error("El número de descuento tiene que estar comprendido entre 0 y 100")
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

        return  (ocupDays * 100) / daysRange
    }
}

class Booking{
    constructor(name, email, check_in, check_out, discount){
        this.name = name,
        this.email = email,
        this.check_in = check_in,
        this.check_out = check_out,
        this.discount = discount
    }
}

module.exports = Booking
module.exports = Room;