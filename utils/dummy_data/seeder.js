const fs = require('fs');
require('colors');
require('dotenv').config();
const Product = require('../../models/product_model');
const dbConnection = require('../../config/database');

// connect to DB
dbConnection();

// Read data
const products = JSON.parse(fs.readFileSync('C:\\Users\\DELL\\Desktop\\node\\nodejs-ecommerce-api\\utils\\dummy_data\\products.json'));


// Insert data into DB
const insertData = async () => {
    try {
        await Product.create(products);

        console.log('Data Inserted'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

// Delete data from DB
const destroyData = async () => {
    try {
        await Product.deleteMany();
        console.log('Data Destroyed'.red.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

// node seeder.js -d
if (process.argv[2] === '-i') {
    insertData();
} else if (process.argv[2] === '-d') {
    destroyData();
}