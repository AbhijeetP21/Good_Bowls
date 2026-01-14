const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Bowl = require('./models/bowlModel');

dotenv.config();

// Sample Bowls Data
const bowls = [
    {
        name: 'Mediterranean Bowl',
        varients: ['small', 'medium', 'large'],
        prices: [
            {
                small: 12,
                medium: 15,
                large: 18,
            },
        ],
        category: 'vegetarian',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
        description: 'A fresh mix of crisp romaine, cherry tomatoes, cucumbers, kalamata olives, and feta cheese, drizzled with olive oil and oregano.',
    },
    {
        name: 'Protein Power Bowl',
        varients: ['small', 'medium', 'large'],
        prices: [
            {
                small: 14,
                medium: 17,
                large: 20,
            },
        ],
        category: 'non-veg', // Using 'non-veg' as per schema convention or 'protein-rich'
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
        description: 'Packed with grilled chicken, quinoa, avocado, black beans, and hard-boiled eggs for the ultimate post-workout fuel.',
    },
    {
        name: 'Garden Fresh Bowl',
        varients: ['small', 'medium', 'large'],
        prices: [
            {
                small: 10,
                medium: 13,
                large: 16,
            },
        ],
        category: 'vegan',
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800',
        description: 'A vibrant medley of seasonal greens, radishes, carrots, and bell peppers, topped with sunflower seeds.',
    },
    {
        name: 'BBQ Ranch Bowl',
        varients: ['small', 'medium', 'large'],
        prices: [
            {
                small: 13,
                medium: 16,
                large: 19,
            },
        ],
        category: 'non-veg',
        image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=800',
        description: 'Smoky BBQ chicken, corn, crispy onions, and cheddar cheese over chopped lettuce with creamy ranch dressing.',
    },
    {
        name: 'Veggie Delight Bowl',
        varients: ['small', 'medium', 'large'],
        prices: [
            {
                small: 11,
                medium: 14,
                large: 17,
            },
        ],
        category: 'vegetarian',
        image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=800',
        description: 'Roasted sweet potatoes, kale, chickpeas, and tahini dressing make this a hearty and healthy choice.',
    },
    {
        name: 'Tropical Bowl',
        varients: ['small', 'medium', 'large'],
        prices: [
            {
                small: 12,
                medium: 15,
                large: 18,
            },
        ],
        category: 'vegetarian',
        image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800',
        description: 'A touch of sweetness with mango, pineapple, and strawberries mixed with spinach and toasted nuts.',
    },
    {
        name: 'Asian Sesame Crunch',
        varients: ['small', 'medium', 'large'],
        prices: [
            {
                small: 13,
                medium: 16,
                large: 19,
            },
        ],
        category: 'vegan',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', // Reusing a nice salad image or finding a new one if possible, but keeping it simple with same set for now or slightly different url param to avoid cache
        description: 'Crispy wontons, mandarin oranges, edamame, and shredded carrots on a bed of mixed greens with sesame ginger dressing.',
    },
    {
        name: 'Southwest Fiesta',
        varients: ['small', 'medium', 'large'],
        prices: [
            {
                small: 14,
                medium: 17,
                large: 20,
            },
        ],
        category: 'non-veg',
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800',
        description: 'Spicy grilled chicken, black beans, corn, avocado, and tortilla strips with a zesty cilantro lime vinaigrette.',
    },
];

const seedDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        await Bowl.deleteMany(); // Clear existing
        console.log('Existing bowls removed');

        await Bowl.insertMany(bowls);
        console.log('Sample bowls imported!');

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedDB();
