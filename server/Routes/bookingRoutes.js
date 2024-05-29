const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const authMiddleware = require("../Middlewares/authMiddleware");
const Booking = require("../Models/BookingModel");
const Show = require("../Models/showModel");

// Payment Route

router.post("/make-payment", async (req, res) => {
  try {
    const { token, amount } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const paymentIntent = await stripe.paymentIntents.create({
        amount:amount,
        currency:'INR',
        customer:customer.id,
        payment_method_types:['card'],
        receipt_email:token.email,
        description:'Token has been assigned to the movie!'
    });

    const transactionId = paymentIntent.id;

    res.send({
        success:true,
        message:'Payment Successful! Ticket(s) Booked',
        data:transactionId
    })

  } catch (error) {
    res.send({
        success:false,
        message:error.message
    })
  }
});


// Book show after the payment is completed

router.post('/book-show', async (req, res) => {
    try{
        const newBooking = new Booking(req.body);
        await newBooking.save();

        const show = await Show.findById(req.body.show).populate("movie");
        const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
        await Show.findByIdAndUpdate(req.body.show, { bookedSeats: updatedBookedSeats });
        res.send({
            success: true,
            message: 'New Booking done!',
            data: newBooking
        });
    }catch(err){
        res.send({
            success: false,
            message: err.message
        });
    }
});

// Get bookings wrt to user ID

router.get("/get-all-bookings", authMiddleware, async (req, res) => {
    try{
        const bookings = await Booking.find({ user: req.body.userID })
        .populate("user")
        .populate("show")
            .populate({
                path: "show",
                populate: {
                    path: "movie",
                    model: "movies"
                }
            })
            .populate({
                path: "show",
                populate: {
                    path: "theater",
                    model: "theaters"
                }
            });
        
        res.send({
            success: true,
            message: "Bookings fetched!",
            data: bookings
        })

    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});

module.exports = router;