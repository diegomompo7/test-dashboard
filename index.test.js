"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rooms_1 = require("./rooms");
const bookings_1 = require("./bookings");
const rooms = [{
        "name": "Deluxe-Room - 215",
        "rate": 189,
        "discount": 30,
        booking: null
    },
    {
        "name": "Suite Junior - 402",
        "rate": 66,
        "discount": 0,
        booking: null
    }];
const bookings = [
    {
        "name": "Alice Johnson",
        "email": "alice.johnson@example.com",
        "check_in": "2023-12-10",
        "check_out": "2023-12-15",
        "discount": 10,
        room: null,
    },
    {
        "name": "Bob Smith",
        "email": "bob.smith@example.com",
        "check_in": "2023-12-12",
        "check_out": "2023-12-17",
        "discount": 10,
        room: null
    }
];
describe('Comprueba los tipos de variable', () => {
    test('El nombre de room debe ser string', () => {
        expect(typeof rooms[0].name).toBe('string');
    });
    test('El precio de room debe ser un entero', () => {
        expect(typeof rooms[0].rate).toBe('number');
    });
    test('El precio de descuento de room debe ser un entero', () => {
        expect(typeof rooms[0].discount).toBe('number');
    });
    test('El name de booking debe ser un string', () => {
        expect(typeof bookings[0].name).toBe('string');
    });
    test('El email de booking debe ser un string', () => {
        expect(typeof bookings[0].email).toBe('string');
    });
    test('La fecha de entrada de booking debe ser tipo string', () => {
        expect(typeof bookings[0].check_in).toBe('string');
    });
    test('La fecha de salida de booking debe ser tipo string', () => {
        expect(typeof bookings[0].check_out).toBe('string');
    });
    test('El precio de descuento de booking debe ser un entero', () => {
        expect(typeof bookings[0].discount).toBe('number');
    });
});
describe('Comprueba que el precio está en céntimos y los errores de discount', () => {
    test('El precio de room se debe calcular en céntimos', () => {
        expect(new rooms_1.Room(rooms[0].name, rooms[0].rate, rooms[0].discount, bookings[0]).calcCent()).toBe(18900);
    });
    test('Si el precio de room es mayor que 100 o menor que 0 devuelve un error', () => {
        expect(() => new rooms_1.Room(rooms[0].name, rooms[0].rate, 101, bookings[0]).discountError()).toThrowError("El número de descuento tiene que estar comprendido entre 0 y 100");
    });
    test('Si el precio de room está entre 0 y que 100 devuelve el descuento', () => {
        expect(new rooms_1.Room(rooms[0].name, rooms[0].rate, rooms[0].discount, bookings[0]).discountError()).toBe(30);
    });
    test('Si el precio de booking está entre 0 y que 100 devuelve el descuento', () => {
        expect(new bookings_1.Booking(bookings[0].name, bookings[0].email, bookings[0].check_in, bookings[0].check_out, bookings[0].discount, rooms[0]).discountError()).toBe(10);
    });
    test('Si el precio de booking es mayor que 100 o menor que 0 devuelve un error', () => {
        expect(() => new bookings_1.Booking(bookings[0].name, bookings[0].email, bookings[0].check_in, bookings[0].check_out, 101, rooms[0]).discountError()).toThrowError("El número de descuento tiene que estar comprendido entre 0 y 100");
    });
});
describe('Comprueba si la habitación está ocupada', () => {
    test('isOcupped devuelve true si la habitación está ocupada', () => {
        expect(() => new rooms_1.Room(rooms[0].name, rooms[0].rate, rooms[0].discount, bookings[0]).isOcupped(new Date('2023-12-12'))).toBeTruthy();
    });
    test('isOcupped devuelve false si la habitación no está ocupada', () => {
        expect(new rooms_1.Room(rooms[0].name, rooms[0].rate, rooms[0].discount, bookings[0]).isOcupped(new Date('2023-12-16'))).toBeFalsy();
    });
});
describe("Comprueba el porcentaje de ocupación", () => {
    test('ocuppancyPorcentaje() devuelve el porcentaje de días de ocupación', () => {
        expect(new rooms_1.Room(rooms[0].name, rooms[0].rate, rooms[0].discount, bookings[0]).occupancyPercentaje(new Date('2023-12-07'), new Date('2023-12-11'))).toBe("25.00");
    });
    test('totalOcuppancyPorcentaje() devuelve el porcentaje de días de ocupación de las habitaciones', () => {
        const room = rooms.map((roomData, i) => new rooms_1.Room(roomData.name, roomData.rate, roomData.discount, bookings[i]));
        expect(rooms_1.Room.totalOccupancyPorcentaje(room, new Date('2023-12-1'), new Date('2023-12-31'))).toBe("33.29");
    });
    test('availableRooms() devuelve el array de habitaciones disponibles entre dos fechas', () => {
        const room = rooms.map((roomData, i) => new rooms_1.Room(roomData.name, roomData.rate, roomData.discount, bookings[i]));
        expect(rooms_1.Room.occupancyPorcentaje(room, new Date('2023-12-22'), new Date('2023-12-29'))).toEqual(["Deluxe-Room - 215", "Suite Junior - 402"]);
    });
});
describe('Comprueba el precio final con los descuentos aplicados', () => {
    test('getFee() devuelve el primero el precio de descuento de la habitación y luego el precio de descuento de booking en base a primer descuento', () => {
        expect(new bookings_1.Booking(bookings[0].name, bookings[0].email, bookings[0].check_in, bookings[0].check_out, bookings[0].discount, rooms[0]).getFee()).toBe(11907);
    });
});
