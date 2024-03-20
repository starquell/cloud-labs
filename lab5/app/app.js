const express = require('express');
const mongoose = require('mongoose');
const assert = require('assert');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const MONGO_HOST = process.env.MONGO_HOST || 'localhost'
const MONGO_PORT = process.env.MONGO_PORT || '27017'
const MONGO_URL = process.env.MONGO_URL || `${MONGO_HOST}:${MONGO_PORT}`

assert(process.env.MONGO_USER, "MONGO_USER is required")
assert(process.env.MONGO_PWD, "MONGO_PWD is required")

console.log(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${MONGO_URL}/`);

// MongoDB connection
mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${MONGO_URL}/`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define a schema
const ElephantSchema = new mongoose.Schema({
    content: String
});

const ElephantModel = mongoose.model('ElephantSchema', ElephantSchema);

// Routes
app.get('/', async (req, res) => {
    const elephants = await ElephantModel.find();
    res.render('index', { elephants });
});

app.post('/elephant', async (req, res) => {
    const newElephant = new ElephantModel({ content: req.body.newElephant });
    await newElephant.save();
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
