const booking = require("./booking.json");

class Room{
    constructor(name, rate, discount){
        this.name = name,
        this.rate = rate,
        this.discount = discount,
        this.booking = booking[0]
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