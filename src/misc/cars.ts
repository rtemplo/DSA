interface Car {
  brand: string;
  price: number;
}

interface Employee {
  name: string;
  soldCars: Record<string, number>;
}

const cars: Car[] = [
  { brand: "Mazda", price: 22000 },
  { brand: "BMW", price: 45000 },
  { brand: "Toyota", price: 28000 },
  { brand: "Audi", price: 52000 },
  { brand: "Kia", price: 19000 },
];

const employees: Employee[] = [
  { name: "Alice", soldCars: { Mazda: 2, BMW: 1, Toyota: 1 } },
  { name: "Bob", soldCars: { Mazda: 3, BMW: 5, Kia: 2 } },
  { name: "Charlie", soldCars: { Audi: 2, Toyota: 3 } },
  { name: "Diana", soldCars: { Kia: 5, Mazda: 1 } },
  { name: "Ethan", soldCars: { BMW: 2, Audi: 1 } }, //  (2 * 45000 + 1 * 52000) / 3 = 47333.33
];

function getWinner(cars: Car[], employees: Employee[]) {
  const carsMap = new Map(cars.map(({ brand, price }) => [brand, price]));
  return employees
    .map<{ name: string; total: number }>(({ name, soldCars }) => {
      const empTotal = Object.entries(soldCars).reduce(
        (sumTotal, [brandSold, qty]) => sumTotal + (carsMap.get(brandSold) ?? 0) * qty,
        0
      );
      return { name, total: empTotal };
    })
    .sort((a, b) => b.total - a.total)[0];
}

const winner = getWinner(cars, employees);
console.log(winner);
console.log("exit");
