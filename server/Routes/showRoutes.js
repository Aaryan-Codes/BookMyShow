const router = require('express').Router();
const Show = require('../Models/showModel');

// Add a show

router.post('/add-show',async(req,res)=>{
    try {
        const newShow = new Show(req.body);
        await newShow.save();
        res.send({
            success:true,
            message:'New Show Successfully Added'
        });
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

// Delete a show

router.post('/delete-show',async(req,res)=>{
    try {
        await Show.findByIdAndDelete(req.body.showId);
        res.send({
            success:true,
            message:"Show Successfully Deleted!"
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

// Update a show

router.put('/update-show',async(req,res)=>{
    try {
        await Show.findByIdAndUpdate(req.body.showId,req.body);
        res.send({
            success:true,
            message:'Show Successfully Updated!'
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

// Get show by Movie

router.post('/get-all-theaters-by-movie',async(req,res)=>{
    try {
        const { movie, date } = req.body;
        const shows = await Show.find({movie,date}).populate('theater');
        let uniqueTheaters = []
        shows.forEach((show)=>{
            let isTheater = uniqueTheaters.find((theater)=>theater._id===show.theater._id);
            if(!isTheater){
                let showOfThisTheater = shows.filter((showObj)=>showObj.theater._id == show.theater._id);
                uniqueTheaters.push({...show.theater._doc,shows:showOfThisTheater});
            }
        })
        res.send({
            success:true,
            message:'All Theaters Fetched!',
            data:uniqueTheaters
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

// Get shows by Theater

router.post('/get-all-shows-by-theater',async(req,res)=>{
    try {
        const shows = await Show.find({theater:req.body.theaterId}).populate('movie')
        res.send({
            success:true,
            message:'All Shows Fetched!',
            data:shows
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

router.post('/get-show-by-id', async (req, res) => {
    try{
        const show = await Show.findById(req.body.showId).populate('movie').populate('theater');
        res.send({
            success: true,
            message: 'Shows Fetched!',
            data: show
        });
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});

module.exports = router;