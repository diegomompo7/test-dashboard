"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
class Room {
    constructor(name, rate, discount, booking) {
        this.name = name,
            this.rate = rate,
            this.discount = discount,
            this.booking = booking;
    }
    calcCent() {
        return this.rate * 100;
    }
    discountError() {
        if (this.discount < 0 || this.discount > 100) {
            throw new Error("El número de descuento tiene que estar comprendido entre 0 y 100");
        }
        else {
            return this.discount;
        }
    }
    isOcupped(date) {
        if (this.booking) {
            return new Date(this.booking.check_in) <= date && date <= new Date(this.booking.check_out);
        }
        return false;
    }
    occupancyPercentaje(startDate, endDate) {
        if (this.booking) {
            const daysRange = (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000);
            const lastDay = endDate > new Date(this.booking.check_out) ? new Date(this.booking.check_out) : endDate;
            const firstDay = startDate > new Date(this.booking.check_in) ? startDate : new Date(this.booking.check_in);
            const ocupDays = (lastDay.getTime() - firstDay.getTime()) / (24 * 60 * 60 * 1000);
            return ((ocupDays * 100) / daysRange).toFixed(2);
        }
        return "0.00";
    }
    static totalOccupancyPorcentaje(rooms, startDate, endDate) {
        const daysRange = (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000);
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
    static occupancyPorcentaje(rooms, startDate, endDate) {
        let availableRooms = [];
        rooms.forEach(element => {
            if (!element.booking || startDate > new Date(element.booking.check_out) || endDate < new Date(element.booking.check_in)) {
                availableRooms.push(element.name);
            }
        });
        return availableRooms;
    }
}
exports.Room = Room;
exports.default = Room;
