const express = require("express");

const router = express.Router();
const superAdminController = require("../controllers/superAdminController");

router.post('/login', superAdminController.login);
router.post('/send-reset-link',superAdminController.sendResetLink);
router.post('/reset-password',superAdminController.resetPassword);


module.exports = router;
