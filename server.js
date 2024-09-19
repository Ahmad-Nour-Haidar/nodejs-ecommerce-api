require('dotenv').config();

const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Our API');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});