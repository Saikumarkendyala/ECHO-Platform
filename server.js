const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/echoesDB', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    username: String,
    password: String // Store hash in production!
});
const User = mongoose.model('User', userSchema);

app.post('/api/signup', async (req, res) => {
    try {
        const existing = await User.findOne({ username: req.body.username });
        if (existing) return res.status(400).json({ error: 'User exists' });
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User created' });
    } catch (e) {
        res.status(500).json({ error: 'DB error' });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        res.status(200).json({ message: 'Success' });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));
