import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { GalleryImage } from "../models/index.js";

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), "uploads", "gallery");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// Upload image to gallery
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

    const { category = "temple", uploadedBy = "admin" } = req.body;

    const galleryImage = new GalleryImage({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: `/uploads/gallery/${req.file.filename}`,
      category,
      uploadedBy,
    });

    await galleryImage.save();

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        id: galleryImage._id,
        filename: galleryImage.filename,
        path: galleryImage.path,
        category: galleryImage.category,
        uploadDate: galleryImage.uploadDate,
      },
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Get all gallery images
router.get("/", async (req, res) => {
  try {
    const { category, page = 1, limit = 20, active = true } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (active !== undefined) filter.isActive = active === "true";

    const images = await GalleryImage.find(filter)
      .sort({ uploadDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await GalleryImage.countDocuments(filter);

    res.json({
      success: true,
      data: images,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Get image by ID
router.get("/:id", async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    // Increment view count
    await GalleryImage.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });

    res.json({
      success: true,
      data: image,
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Update image details (admin only)
router.patch("/:id", async (req, res) => {
  try {
    const { category, isActive, notes } = req.body;

    const updateData = {};
    if (category) updateData.category = category;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (notes) updateData.notes = notes;

    const image = await GalleryImage.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    res.json({
      success: true,
      message: "Image updated successfully",
      data: image,
    });
  } catch (error) {
    console.error("Error updating image:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Delete image (admin only)
router.delete("/:id", async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    // Delete file from filesystem
    const filePath = path.join(
      process.cwd(),
      "uploads",
      "gallery",
      image.filename
    );
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await GalleryImage.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Like/Unlike image
router.post("/:id/like", async (req, res) => {
  try {
    const { action = "like" } = req.body; // "like" or "unlike"

    const increment = action === "like" ? 1 : -1;

    const image = await GalleryImage.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: increment } },
      { new: true }
    );

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    res.json({
      success: true,
      message: `Image ${action}d successfully`,
      data: {
        likes: image.likes,
      },
    });
  } catch (error) {
    console.error("Error liking image:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Get gallery statistics
router.get("/stats/overview", async (req, res) => {
  try {
    const totalImages = await GalleryImage.countDocuments();
    const activeImages = await GalleryImage.countDocuments({ isActive: true });
    const totalViews = await GalleryImage.aggregate([
      { $group: { _id: null, total: { $sum: "$views" } } },
    ]);
    const totalLikes = await GalleryImage.aggregate([
      { $group: { _id: null, total: { $sum: "$likes" } } },
    ]);

    // Get category distribution
    const categoryStats = await GalleryImage.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    // Get monthly upload statistics
    const monthlyStats = await GalleryImage.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$uploadDate" },
            month: { $month: "$uploadDate" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1 },
      },
      {
        $limit: 12,
      },
    ]);

    res.json({
      success: true,
      data: {
        total: totalImages,
        active: activeImages,
        totalViews: totalViews[0]?.total || 0,
        totalLikes: totalLikes[0]?.total || 0,
        categoryDistribution: categoryStats,
        monthlyUploads: monthlyStats,
      },
    });
  } catch (error) {
    console.error("Error fetching gallery stats:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Bulk upload images (admin only)
router.post("/bulk-upload", upload.array("images", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No image files provided",
      });
    }

    const { category = "temple", uploadedBy = "admin" } = req.body;
    const uploadedImages = [];

    for (const file of req.files) {
      const galleryImage = new GalleryImage({
        filename: file.filename,
        originalName: file.originalname,
        path: `/uploads/gallery/${file.filename}`,
        category,
        uploadedBy,
      });

      await galleryImage.save();
      uploadedImages.push({
        id: galleryImage._id,
        filename: galleryImage.filename,
        path: galleryImage.path,
      });
    }

    res.status(201).json({
      success: true,
      message: `${uploadedImages.length} images uploaded successfully`,
      data: uploadedImages,
    });
  } catch (error) {
    console.error("Error bulk uploading images:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default router;
