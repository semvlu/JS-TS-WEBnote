// Web app & API on server
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // spec port# in .env file 

// Def. routes & middleware
// GET, POST, PUT, DELETE
app.get('file', (req, res) => {
    res.sendFile(path.join(__dirname, 'IMG_001.jpg'));
});

app.get('/', (req, res) => { // '/sub-route'
    res.set('Content-Type', 'text/html');
    res.status(200).send('<h1>Welcome to the server root!</h1>');
})

// static middleware: for static files, e.g. CSS, JS, img
const path = require('path');

app.use('/static', express.static('dir')); // serve static files from 'public' dir
// '/static': where middleware will be mounted, not necessary

app.listen(PORT, (err) => {
    if (!err)
        console.log(`Server running on ${PORT}`);
    else
        console.log("Error: " + err);
});