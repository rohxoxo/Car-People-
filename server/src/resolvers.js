import { v4 as uuidv4 } from 'uuid';
import find from 'lodash.find'
import remove from 'lodash.remove'

let people = [
  { id: '1', firstName: 'Paul', lastName: 'Lam' },
  { id: '2', firstName: 'John', lastName: 'Smith' },
  { id: '3', firstName: 'Jane', lastName: 'Doe' }
];
let cars = [
  { id: '1', year: 2020, make: 'Toyota', model: 'Camry', price: 24000, personId: '1' },
  { id: '2', year: 2019, make: 'Honda', model: 'Accord', price: 22000, personId: '2' }
];

const resolvers = {
  Query: {
    people: () => people,
    person: (root, args) => find(people, { id: args.id }),
    cars: () => cars,
    car: (root, args) => find(cars, { id: args.id }),
  },
  Mutation: {
    addPerson: (root, args) => {
      const newPerson = { id: uuidv4(), firstName: args.firstName, lastName: args.lastName };
      people.push(newPerson);
      return newPerson;
    },
    updatePerson: (root, args) => {
      const person = find(people, { id: args.id });
      if (!person) throw new Error(`Couldn't find person with id ${args.id}`);
      person.firstName = args.firstName || person.firstName;
      person.lastName = args.lastName || person.lastName;
      return person;
    },
    deletePerson: (root, args) => {
      const person = find(people, { id: args.id });
      if (!person) throw new Error(`Couldn't find person with id ${args.id}`);
      remove(people, p => p.id === args.id);
      remove(cars, c => c.personId === args.id); // Also remove the person's cars
      return person;
    },
    addCar: (root, args) => {
      const newCar = { id: uuidv4(), year: args.year, make: args.make, model: args.model, price: args.price, personId: args.personId };
      cars.push(newCar);
      return newCar;
    },
    updateCar: (root, args) => {
      const car = find(cars, { id: args.id });
      if (!car) throw new Error(`Couldn't find car with id ${args.id}`);
      car.year = args.year || car.year;
      car.make = args.make || car.make;
      car.model = args.model || car.model;
      car.price = args.price || car.price;
      car.personId = args.personId || car.personId;
      return car;
    },
    deleteCar: (root, args) => {
      const car = find(cars, { id: args.id });
      if (!car) throw new Error(`Couldn't find car with id ${args.id}`);
      remove(cars, c => c.id === args.id);
      return car;
    }
  },
  Person: {
    cars: (parent) => cars.filter(car => car.personId === parent.id)
  }
};

export default resolvers;
