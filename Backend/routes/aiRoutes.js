const express = require('express')
const aiControllers = require('../controllers/aiControllers')
const router = express.Router()

router.post('/get-review', aiControllers.getResponse)
router.get('/history', aiControllers.getHistory)
module.exports = router