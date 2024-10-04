const express = require("express");

const router = express.Router();
const superAdminController = require("../controllers/superAdminController");

router.post('/login', superAdminController.login);

module.exports = router;
