"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
class Booking {
    constructor(name, email, check_in, check_out, discount, room) {
        this.name = name,
            this.email = email,
            this.check_in = check_in,
            this.check_out = check_out,
            this.discount = discount,
            this.room = room;
    }
    discountError() {
        if (this.discount < 0 || this.discount > 100) {
            throw new Error("El número de descuento tiene que estar comprendido entre 0 y 100");
        }
        else {
            return this.discount;
        }
    }
    getFee() {
        const onCent = this.room.rate * 100;
        const discountRoom = onCent - (onCent * (this.room.discount / 100));
        const discountFinal = discountRoom - (discountRoom * (this.discount / 100));
        return discountFinal;
    }
}
exports.Booking = Booking;
module.exports = Booking;
