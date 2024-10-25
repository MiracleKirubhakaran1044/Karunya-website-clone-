// const express = require('express');
// const mongoose = require('mongoose');
// const path = require('path');

// const app = express();
// const PORT = 3019;

// // Middleware to parse incoming requests
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, 'public')));

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/admissionsDB')
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Define a Mongoose schema for the application
// const applicationSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     mobile: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true },
//     country: { type: String, required: true },
//     state: { type: String, required: true },
//     city: { type: String, required: true },
//     pincode: { type: String, required: true },
//     contact_time: { type: String, required: true },
//     language: { type: String, required: true },
//     gender: { type: String, required: true },
//     program_level: { type: String, required: true }
// });

// // Create a Mongoose model from the schema
// const Application = mongoose.model('Application', applicationSchema);

// // Route to serve the application form
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.get('/karunyaadd', (req, res) => {
//     res.sendFile(path.join(__dirname, 'karunyaadd.html'));
// });

// // Route to handle form submission
// app.post('/submit-form', async (req, res) => {
//     const {
//         name, mobile, email, password, country, state,
//         city, pincode, contact_time, language, gender, program_level
//     } = req.body;

//     try {
//         // Create a new application document
//         const newApplication = new Application({
//             name,
//             mobile,
//             email,
//             password,
//             country,
//             state,
//             city,
//             pincode,
//             contact_time,
//             language,
//             gender,
//             program_level
//         });

//         // Save the application to the database
//         await newApplication.save();
//         res.status(200).send('Application submitted successfully!');
//     } catch (err) {
//         console.error('Error saving application:', err);
//         res.status(500).send('Failed to submit application.');
//     }
// });

// // 404 Route Handler
// app.use((req, res) => {
//     res.status(404).send('Page not found');
// });

// // Global error handler
// app.use((err, req, res, next) => {
//     console.error('Unhandled error:', err);
//     res.status(500).send('Something went wrong, please try again later.');
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running at http://localhost:${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


const PORT = 3019;

// Middleware to parse incoming requests
const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended:true}));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/admissionsDB')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a Mongoose schema for the application
const applicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    contact_time: { type: String, required: true },
    language: { type: String, required: true },
    gender: { type: String, required: true },
    program_level: { type: String, required: true }
});

// Create a Mongoose model from the schema
const Application = mongoose.model('Application', applicationSchema);

// Route to serve karunyaadd.html as the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'karunyaadd.html'));
});

// Route to handle form submission
app.post('/submit-form', async (req, res) => {
    const {
        name, mobile, email, password, country, state,
        city, pincode, contact_time, language, gender, program_level
    } = req.body;

    try {
        // Create a new application document
        const newApplication = new Application({
            name,
            mobile,
            email,
            password,
            country,
            state,
            city,
            pincode,
            contact_time,
            language,
            gender,
            program_level
        });

        // Save the application to the database
        await newApplication.save();
        res.status(200).send('Application submitted successfully!');
    } catch (err) {
        console.error('Error saving application:', err);
        res.status(500).send('Failed to submit application.');
    }
});

// 404 Route Handler
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).send('Something went wrong, please try again later.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
