const express = require('express');
const {
  createImage,
  getImages,
  getImageById,
  updateImage,
  deleteImage,
  uploadImage,
} = require('../controllers/imageController');
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, authorize([1, 2, 3]), getImages)
  .post(protect, authorize([1, 2]), uploadImage, createImage);

router.route('/:id')
  .get(protect, authorize([1, 2, 3]), getImageById)
  .put(protect, authorize([1, 2]), updateImage)
  .delete(protect, authorize([1]), deleteImage);

module.exports = router;
