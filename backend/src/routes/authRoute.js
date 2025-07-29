const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const authController = require('../controllers/authController');
const authMiddleware = require('../middlerwares/authMiddleware');
const { multerMiddleware } = require('../../config/cloudinaryConfig');

const router = express.Router();

router.post('/send-otp', authController.sendOtp);
router.post('/verify-otp', authController.verifyOtp);
router.put('/update-profile', authMiddleware, multerMiddleware,authController.updateProfile);
router.get('/check-auth',authMiddleware,authController.checkAuthenticated)
router.get('/users',authMiddleware,authController.getAllUsers)

router.get('/logout',authMiddleware,authController.logout)

module.exports = router;
