require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Import your User model

// Connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database connected!');
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
};

const createAdmin = async (name, email, password) => {
    try {
        // Check if admin with the email already exists
        const existingAdmin = await User.findOne({ email });
        if (existingAdmin) {
            console.log('Admin with this email already exists.');
            return;
        }

        // Create a new admin user
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new User({
            name,
            email,
            password: hashedPassword,
            role: 'admin'  // Explicitly set role to 'admin'
        });

        await admin.save();
        console.log('Admin registered successfully!');
    } catch (error) {
        console.error('Error creating admin:', error.message);
    }
};

// Main function to execute the process
const run = async () => {
    await connectDB();
    await createAdmin('deepak goswami', 'dipakgiree41@gmail.com', 'adminPassword123');
    process.exit();
};

run();
    