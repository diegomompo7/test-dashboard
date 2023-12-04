const Room = require("./index");

const rooms= [{
    "name": "Deluxe-Room - 215",
    "rate": 189,
    "discount": 101,
  }]

  const bookings = [
    {
        "name": "Alice Johnson",
        "email": "alice.johnson@example.com",
        "check_in": "2023-12-10",
        "check_out": "2023-12-15",
        "discount": 10
      },
  ]

    test('El nombre debe ser string', () => {
        expect(typeof rooms[0].name).toBe('string')
    })

    test('El precio se debe calcular en céntimos', () => {


        expect(new Room(rooms[0].name, rooms[0].rate, rooms[0].discount).calcCent()).toBe(18900)
    })

    test('El precio debe ser un entero', () => {
        expect(typeof rooms[0].rate).toBe('number')
    })

    test('El precio de descuento debe ser un entero', () => {
        expect(typeof rooms[0].discount).toBe('number')
    })

    test('El precio pasa de 100 o 0 devuelve un error', () => {
        expect(() => new Room(rooms[0].name, rooms[0].rate, rooms[0].discount).discountError().toThrow("El número de descuento tiene que estar comprendido entre 0 y 100"))
    })

    test('isOcupped devuelve true si la habitación está ocupada', () => {
        expect(() => new Room(rooms[0].name, bookings[0], rooms[0].rate, rooms[0].discount).isOcupped(new Date('2023-12-12'))).toBeTruthy()
    })

    test('isOcupped devuelve false si la habitación no está ocupada', () => {
        expect(new Room(rooms[0].name, bookings[0], rooms[0].rate, rooms[0].discount).isOcupped(new Date('2023-12-16'))).toBeFalsy()
    })

    test('ocuppancyPorcentaje() devuelve el porcentaje de días de ocupación', () => {
        

        expect(new Room(rooms[0].name, rooms[0].rate, rooms[0].discount,  bookings[0]).occupancyPercentaje(new Date('2023-12-07'), new Date('2023-12-11'))).toBe(25)
    })

    test('totalOcuppancyPorcentaje() devuelve el porcentaje de días de ocupación de las habitaciones', () => {
        expect(totalOccupancyPorcentaje(rooms, new Date('2023-12-1'), new Date('2023-12-31'))).toBe(5)
    })

    test('availableRooms() devuelve el array de habitaciones disponibles entre dos fechas', () => {
        expect(occupancyPorcentaje(rooms, new Date('2023-12-22'), new Date('2023-12-29'))).toBe([])
    })