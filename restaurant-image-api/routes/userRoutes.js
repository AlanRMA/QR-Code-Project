const express = require('express');
const { createUser, deleteUser } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, authorize([1]), createUser);

router.route('/:id')
  .delete(protect, authorize([1]), deleteUser);

module.exports = router;
