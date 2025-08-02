const express = require('express');
const app = express();
const mongoose = require('mongoose');




// mongoose connection
const MONGO_URL ="mongodb://127.0.0.1:27017/yournextstay";

main()
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Error connecting to MongoDB', err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}
app.get('/', (req, res) => {
    res.send('Hello i am a Node.js app');
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
    });