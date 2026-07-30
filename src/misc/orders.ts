interface Product {
  sku: string;
  price: number;
  category: string;
}

interface Order {
  customer: string;
  items: Record<string, number>; // sku -> quantity
}

const products: Product[] = [
  { sku: "CHAIR", price: 150, category: "furniture" },
  { sku: "DESK", price: 400, category: "furniture" },
  { sku: "LAMP", price: 60, category: "lighting" },
  { sku: "BULB", price: 12, category: "lighting" },
  { sku: "RUG", price: 220, category: "decor" },
  { sku: "MIRROR", price: 90, category: "decor" },
  { sku: "STOOL", price: 45, category: "furniture" },
];

const orders: Order[] = [
  { customer: "Alice", items: { CHAIR: 2, LAMP: 1 } },
  { customer: "Bob", items: { DESK: 1, BULB: 4, RUG: 1 } },
  { customer: "Charlie", items: { CHAIR: 1, DESK: 1, LAMP: 2 } },
  { customer: "Diana", items: { RUG: 2, BULB: 6 } },
  { customer: "Ethan", items: { LAMP: 3, CHAIR: 1 } },
];

const productsMap = new Map(products.map(({ sku, price }) => [sku, price]));
const categoryMap = new Map(products.map(({ sku, category }) => [sku, category]));

// Exercise 1:
// Calculate the total spend per customer.
// Expected shape: { customer: string; total: number }[]
const totalSpendPerCustomer = orders.map<{ customer: string; total: number }>(
  ({ customer, items }) => {
    const total = Object.entries(items).reduce(
      (purchaseTotal, [purchaseSku, qty]) =>
        purchaseTotal + (productsMap.get(purchaseSku) ?? 0) * qty,
      0
    );
    return { customer, total };
  }
);
console.log("totalSpendPerCustomer: ", totalSpendPerCustomer);

// Exercise 2:
// Find the customer with the highest total spend.
// const topCustomer = totalSpendPerCustomer.sort((a, b) => b.total - a.total)[0];
const topCustomer = totalSpendPerCustomer.reduce<{ customer: string; total: number } | null>(
  (best, cur) => (best ? (cur.total > best.total ? cur : best) : cur),
  null
);
console.log("topCustomer: ", topCustomer);

// Exercise 3:
// Calculate the total revenue per category across all orders.
// Expected shape: { category: string; revenue: number }[]
// Hint: you'll need to look up each product's category when iterating order items.
const revenueByCategory = Object.entries(
  orders.reduce<Record<string, number>>((ledger, { items }) => {
    for (const [sku, qty] of Object.entries(items)) {
      const category = categoryMap.get(sku);
      if (!category) continue;
      ledger[category] = (ledger[category] ?? 0) + (productsMap.get(sku) ?? 0) * qty;
    }
    return ledger;
  }, {})
).map(([category, total]) => ({ category, revenue: total }));
console.log("revenueByCategory: ", revenueByCategory);

// Exercise 4:
// Find any customers who ordered a product that doesn't exist in the products list.
// Expected shape: { customer: string; unknownSkus: string[] }[]
const unfillableOrders = orders
  .map(({ customer, items }) => {
    const unknownSkus = new Set<string>();
    for (const [sku, _qty] of Object.entries(items)) {
      if (!productsMap.has(sku)) unknownSkus.add(sku);
    }
    return { customer, unknownSkus: Array.from(unknownSkus) };
  })
  .filter(({ unknownSkus }) => unknownSkus.length > 0);

console.log("unfillableOrders: ", unfillableOrders);

// Exercise 5:
// Find every product that was never ordered by any customer.
// Expected shape: Product[]
const orderedSkus = new Set(orders.flatMap(({ items }) => Object.keys(items)));
const unsoldProducts = products.filter(({ sku }) => !orderedSkus.has(sku));
console.log("unsoldProducts: ", unsoldProducts);

console.log("exiting");
