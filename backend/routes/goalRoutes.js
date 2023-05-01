const express = require('express')
const router = express.Router()
const { getGoal, 
        setGoal,
        updateGoal,
        deleteGoal} = require('../controllers/goalController')
const {protect} = require('../middleware/authMiddleware')

//  ENDPOINT = api/goals/
router.route('/').get(protect, getGoal).post(protect, setGoal)
// router.get('/', getGoal)
// router.post('/', setGoal)

router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)
// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)

module.exports = router