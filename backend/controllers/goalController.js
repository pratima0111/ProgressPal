const asyncHandler  = require('express-async-handler')

//@description: Get Gaol
//@route:       GET  api/goals
//@access:      Private
const getGoal = asynchHandler(async (req, res) => {
    res.status(200).json({message:'Get Goals'})
})

//@description: Set Gaol
//@route:       POST  api/goals
//@access:      Private
const setGoal = asynchHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text feild')
    }
    res.status(200).json({message:'Set Goals'})
})

//@description: Update Gaol
//@route:       PUT  api/goals/:id
//@access:      Private
const updateGoal = asynchHandler(async (req, res) => {
    res.status(200).json({message:`Update goal ${req.params.id}`})
})

//@description: Delete Gaol
//@route:       DELETE  api/goals/:id
//@access:      Private
const deleteGoal = asynchHandler(async (req, res)=> {
    res.status(200).json({message:`Delete goal ${req.params.id}`})
})


module.exports = {
    getGoal, 
    setGoal, 
    updateGoal, 
    deleteGoal
}