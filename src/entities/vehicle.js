class Vehicle {
  constructor({ id, registrationNumber, make, model, year, rentalPrice }) {
    this.id = id;
    this.registrationNumber = registrationNumber;
    this.make = make;
    this.model = model;
    this.year = year;
    this.rentalPrice = rentalPrice;
  }

  isRecent() {
    return this.year >= new Date().getFullYear() - 3;
  }
}

module.exports = Vehicle;
