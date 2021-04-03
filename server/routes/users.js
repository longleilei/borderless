const express = require('express'); 
const auth = require('../middleware/auth.js'); 

const router = express.Router();

const { signin, signup } = require('../controllers/userControllers.js'); 

router.post("/signin", signin);
router.post("/signup", signup);

module.exports = router; 
