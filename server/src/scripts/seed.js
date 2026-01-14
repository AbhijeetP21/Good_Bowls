/**
 * Database Seed Script
 * Populates database with sample data for pizzas, bases, toppings, cheese, and sauces
 * 
 * Run: npm run seed
 */
require('dotenv').config();
const mongoose = require('mongoose');

// MongoDB connection
const DB = process.env.DB;

// Define schemas inline for seeding (to avoid circular dependencies)
const pizzaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  varients: [{ type: String }],
  prices: [{ type: Object }],
  category: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
});

const baseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prices: [{ type: Object }],
});

const toppingSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const cheeseSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const sauceSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Pizza = mongoose.model('Pizza', pizzaSchema);
const Base = mongoose.model('Base', baseSchema);
const Topping = mongoose.model('Topping', toppingSchema);
const Cheese = mongoose.model('Cheese', cheeseSchema);
const Sauce = mongoose.model('Sauce', sauceSchema);

// Sample Data
const pizzasData = [
  {
    name: 'Margherita',
    varients: ['small', 'medium', 'large'],
    prices: [{ small: 10, medium: 14, large: 18 }],
    category: 'veg',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
    description: 'Classic delight with 100% real mozzarella cheese, fresh tomato sauce, and aromatic basil',
  },
  {
    name: 'Pepperoni',
    varients: ['small', 'medium', 'large'],
    prices: [{ small: 12, medium: 16, large: 20 }],
    category: 'non-veg',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
    description: 'American classic with spicy pepperoni and loads of mozzarella cheese',
  },
  {
    name: 'Farmhouse',
    varients: ['small', 'medium', 'large'],
    prices: [{ small: 11, medium: 15, large: 19 }],
    category: 'veg',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
    description: 'Delightful combination of onion, capsicum, tomato, and grilled mushroom',
  },
  {
    name: 'BBQ Chicken',
    varients: ['small', 'medium', 'large'],
    prices: [{ small: 14, medium: 18, large: 22 }],
    category: 'non-veg',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    description: 'Smoky BBQ sauce with tender chicken chunks and onions',
  },
  {
    name: 'Veggie Supreme',
    varients: ['small', 'medium', 'large'],
    prices: [{ small: 13, medium: 17, large: 21 }],
    category: 'veg',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400',
    description: 'Loaded with capsicum, onion, tomato, mushroom, corn, and olives',
  },
  {
    name: 'Chicken Tikka',
    varients: ['small', 'medium', 'large'],
    prices: [{ small: 14, medium: 18, large: 22 }],
    category: 'non-veg',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400',
    description: 'Spiced chicken tikka chunks with onion, capsicum, and mint mayo',
  },
  {
    name: 'Paneer Tikka',
    varients: ['small', 'medium', 'large'],
    prices: [{ small: 13, medium: 17, large: 21 }],
    category: 'veg',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400',
    description: 'Spiced paneer with capsicum, onion, and red paprika',
  },
  {
    name: 'Meat Lovers',
    varients: ['small', 'medium', 'large'],
    prices: [{ small: 16, medium: 20, large: 24 }],
    category: 'non-veg',
    image: 'https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?w=400',
    description: 'For the meat lovers - pepperoni, chicken sausage, and grilled chicken',
  },
];

const basesData = [
  { name: 'Classic Hand Tossed', prices: [{ small: 2, medium: 3, large: 4 }] },
  { name: 'Cheese Burst', prices: [{ small: 4, medium: 5, large: 6 }] },
  { name: 'Thin Crust', prices: [{ small: 2, medium: 3, large: 4 }] },
  { name: 'New York Style', prices: [{ small: 3, medium: 4, large: 5 }] },
  { name: 'Whole Wheat', prices: [{ small: 3, medium: 4, large: 5 }] },
];

const toppingsData = [
  { name: 'Onion' },
  { name: 'Capsicum' },
  { name: 'Tomato' },
  { name: 'Mushroom' },
  { name: 'Corn' },
  { name: 'Black Olives' },
  { name: 'Jalapeno' },
  { name: 'Paneer' },
  { name: 'Chicken' },
  { name: 'Pepperoni' },
  { name: 'Sausage' },
  { name: 'Pineapple' },
];

const cheeseData = [
  { name: 'Mozzarella' },
  { name: 'Cheddar' },
  { name: 'Parmesan' },
  { name: 'Gouda' },
  { name: 'Feta' },
  { name: 'Extra Cheese' },
];

const saucesData = [
  { name: 'Tomato Basil' },
  { name: 'BBQ Sauce' },
  { name: 'Pesto' },
  { name: 'White Garlic' },
  { name: 'Spicy Red' },
  { name: 'Buffalo' },
];

async function seedDatabase() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(DB);
    console.log('Connected to MongoDB!\n');

    // Clear existing data
    console.log('Clearing existing data...');
    await Pizza.deleteMany({});
    await Base.deleteMany({});
    await Topping.deleteMany({});
    await Cheese.deleteMany({});
    await Sauce.deleteMany({});
    console.log('Existing data cleared.\n');

    // Seed pizzas
    console.log('Seeding pizzas...');
    const pizzas = await Pizza.insertMany(pizzasData);
    console.log(`✓ Created ${pizzas.length} pizzas`);

    // Seed bases
    console.log('Seeding bases...');
    const bases = await Base.insertMany(basesData);
    console.log(`✓ Created ${bases.length} bases`);

    // Seed toppings
    console.log('Seeding toppings...');
    const toppings = await Topping.insertMany(toppingsData);
    console.log(`✓ Created ${toppings.length} toppings`);

    // Seed cheese
    console.log('Seeding cheese...');
    const cheese = await Cheese.insertMany(cheeseData);
    console.log(`✓ Created ${cheese.length} cheese options`);

    // Seed sauces
    console.log('Seeding sauces...');
    const sauces = await Sauce.insertMany(saucesData);
    console.log(`✓ Created ${sauces.length} sauces`);

    console.log('\n========================================');
    console.log('✅ Database seeded successfully!');
    console.log('========================================\n');

    console.log('Summary:');
    console.log(`- ${pizzas.length} Pizzas`);
    console.log(`- ${bases.length} Bases`);
    console.log(`- ${toppings.length} Toppings`);
    console.log(`- ${cheese.length} Cheese options`);
    console.log(`- ${sauces.length} Sauces`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
