const Image = require('../models/imageModel');
const User = require('../models/userModel');
const multer = require('multer');
const path = require('path');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Images only!');
    }
  },
});

exports.uploadImage = upload.single('image');

exports.createImage = async (req, res) => {
  try {
    const image = await Image.create({
      user: req.user._id,
      url: `/uploads/${req.file.filename}`,
      caption: req.body.caption,
    });

    res.status(201).json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getImages = async (req, res) => {
  try {
    const images = await Image.find({});
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (image) {
      res.json(image);
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (image) {
      if (image.user.toString() !== req.user._id.toString() && req.user.role !== 1) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      image.caption = req.body.caption || image.caption;
      await image.save();

      res.json(image);
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (image) {
      if (req.user.role !== 1) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      await image.remove();

      res.json({ message: 'Image removed' });
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
