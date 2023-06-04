class Transport {
  constructor(power, marka, model, maxSpeed) {
    this.power = power;
    this.marka = marka;
    this.model = model;
    this.maxSpeed = maxSpeed;
  }
  move() {
    console.log("hereket basladi");
  }
}
class Car extends Transport {
  constructor(power, marka, model, maxSpeed, fuel_type, type) {
    super(power, marka, model, maxSpeed);
    this.fuel_type = fuel_type;
    this.type = type;
  }
  drift() {
    console.log("drift edirik");
  }
}
class Plane extends Transport {
  constructor(power, marka, model, maxSpeed, passengerCapacity) {
    super(power, marka, model, maxSpeed);
    this.passengerCapacity = passengerCapacity;
  }
  fly() {
    console.log("ucuruq");
  }
}
let p = new Plane()
p.move()