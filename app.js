const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');




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

app.get('/listings', async (req, res) => {
    let sampleListings = new Listing({
        title: "Cozy Beachfront Cottage",
        description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
        image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        price: 15000,
        location: "Malibu",
        country: "United States",
    });
    await sampleListings.save();
    console.log('Sample listing created:', sampleListings);
    res.send('Listing created');    
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
    });