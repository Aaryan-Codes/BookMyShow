const router = require('express').Router(); 
const Theater = require('../Models/theaterModel');

// Add a theater

router.post('/add-theater', async (req,res) =>{
    try {
        const newTheater = new Theater(req.body);
        await newTheater.save();
        res.send({
            success:true,
            message:"Theater Successfully Added!"
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })        
    }
})

// Updating theater

router.put('/update-theater', async (req,res)=>{
    try {
        await Theater.findByIdAndUpdate(req.body.theaterId,req.body);
        res.send({
            success:true,
            message:"Theater has been updated!"
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

// Deleting theater

router.put('/delete-theater',async (req,res)=>{
    try {
        await Theater.findByIdAndDelete(req.body.theaterId);
        res.send({
            success:true,
            message:"Theater Deleted Successfully"
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })        
    }
})

// Get all the theaters for the Admin Route

router.get('/get-all-theater', async (req,res) => {
    
    try {
        const allTheaters = await Theater.find().populate('owner');
        res.send({
            success:true,
            message:"All theaters fetched!",
            data:allTheaters
        });    
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

// Get the theatres of a specific owner
router.post('/get-all-theaters-by-owner',  async (req, res) => {
    try{
        const allTheatres = await Theater.find({owner: req.body.owner});
        res.send({
            success: true,
            message: "All theaters fetched successfully!",
            data: allTheatres
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});

module.exports = router;