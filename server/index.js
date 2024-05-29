require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./Utils/DB');
const PORT = process.env.PORT;
const userRoutes = require('./Routes/userRoutes');
const theaterRoutes = require('./Routes/theaterRoutes');
const movieRoutes = require('./Routes/movieRoutes');
const showRoutes = require('./Routes/showRoutes');
const bookingRoutes = require('./Routes/bookingRoutes');

app.get('/', async (req,res)=>{
    res.send("Hello from the server side");
})

// Middlewares

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/users', userRoutes);
app.use('/api/theaters',theaterRoutes);
app.use('/api/movies/',movieRoutes);
app.use('/api/shows/',showRoutes);
app.use('/api/bookings',bookingRoutes);

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running @ ${PORT}`);
    })
})



