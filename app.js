const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require("path");
const methodOverride = require("method-override");


// Set up view engine and middleware
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));



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
    res.redirect('/listings');
});

// Index route - Show all listings
app.get('/listings', async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.render('listings/index', { allListings });
    } catch (err) {
        console.error('Error fetching listings:', err);
        res.status(500).send('Something went wrong!');
    }
});

// New route - Show form to create new listing
app.get('/listings/new', (req, res) => {
    res.render('listings/new');
});

// Show route - Show individual listing
app.get('/listings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).send('Listing not found');
        }
        res.render('listings/show', { listing });
    } catch (err) {
        console.error('Error fetching listing:', err);
        res.status(500).send('Something went wrong!');
    }
});

// Create route - Create new listing
app.post('/listings', async (req, res) => {
    try {
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect('/listings');
    } catch (err) {
        console.error('Error creating listing:', err);
        res.status(500).send('Something went wrong!');
    }
});

// Edit route - Show form to edit listing
app.get('/listings/:id/edit', async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).send('Listing not found');
        }
        res.render('listings/edit', { listing });
    } catch (err) {
        console.error('Error fetching listing for edit:', err);
        res.status(500).send('Something went wrong!');
    }
});

// Update route - Update listing
app.put('/listings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        res.redirect(`/listings/${id}`);
    } catch (err) {
        console.error('Error updating listing:', err);
        res.status(500).send('Something went wrong!');
    }
});

// Delete route - Delete listing
app.delete('/listings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Listing.findByIdAndDelete(id);
        res.redirect('/listings');
    } catch (err) {
        console.error('Error deleting listing:', err);
        res.status(500).send('Something went wrong!');
    }
});

// app.get('/listings', async (req, res) => {
//     let sampleListings = new Listing({
//         title: "Cozy Beachfront Cottage",
//         description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
//         image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//         price: 15000,
//         location: "Malibu",
//         country: "United States",
//     });
//     await sampleListings.save();
//     console.log('Sample listing created:', sampleListings);
//     res.send('Listing created');    
// });

app.listen(8080, () => {
    console.log('Server is running on port 8080');
    });