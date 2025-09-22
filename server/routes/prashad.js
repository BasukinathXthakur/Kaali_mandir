import express from "express";
import { PrashadBooking } from "../models/index.js";

const router = express.Router();

// Create a new prashad booking
router.post("/", async (req, res) => {
  try {
    const { type, name, phone, fatherName, village, pincode, address, notes } =
      req.body;

    // Validate required fields based on type
    if (type === "mahaprasad") {
      if (!name || !phone || !fatherName) {
        return res.status(400).json({
          success: false,
          message:
            "Name, phone, and father's name are required for Mahaprasad booking",
        });
      }
    } else if (type === "prashad") {
      if (!name || !phone || !village || !pincode || !address) {
        return res.status(400).json({
          success: false,
          message:
            "Name, phone, village, pincode, and address are required for Prashad booking",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid booking type. Must be 'mahaprasad' or 'prashad'",
      });
    }

    const booking = new PrashadBooking({
      type,
      name,
      phone,
      fatherName,
      village,
      pincode,
      address,
      notes,
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: `${
        type === "mahaprasad" ? "Mahaprasad" : "Prashad"
      } booking created successfully`,
      data: booking,
    });
  } catch (error) {
    console.error("Error creating prashad booking:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Get all prashad bookings (admin only)
router.get("/", async (req, res) => {
  try {
    const { type, status, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;

    const bookings = await PrashadBooking.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await PrashadBooking.countDocuments(filter);

    res.json({
      success: true,
      data: bookings,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    console.error("Error fetching prashad bookings:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Get booking by ID
router.get("/:id", async (req, res) => {
  try {
    const booking = await PrashadBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Update booking status (admin only)
router.patch("/:id/status", async (req, res) => {
  try {
    const { status, deliveryDate, notes } = req.body;

    if (
      !status ||
      !["pending", "confirmed", "delivered", "cancelled"].includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid status is required",
      });
    }

    const updateData = { status };
    if (deliveryDate) updateData.deliveryDate = deliveryDate;
    if (notes) updateData.notes = notes;

    const booking = await PrashadBooking.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      message: "Booking status updated successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Delete booking (admin only)
router.delete("/:id", async (req, res) => {
  try {
    const booking = await PrashadBooking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Get booking statistics
router.get("/stats/overview", async (req, res) => {
  try {
    const totalBookings = await PrashadBooking.countDocuments();
    const mahaprasadBookings = await PrashadBooking.countDocuments({
      type: "mahaprasad",
    });
    const prashadBookings = await PrashadBooking.countDocuments({
      type: "prashad",
    });
    const pendingBookings = await PrashadBooking.countDocuments({
      status: "pending",
    });
    const confirmedBookings = await PrashadBooking.countDocuments({
      status: "confirmed",
    });
    const deliveredBookings = await PrashadBooking.countDocuments({
      status: "delivered",
    });

    res.json({
      success: true,
      data: {
        total: totalBookings,
        mahaprasad: mahaprasadBookings,
        prashad: prashadBookings,
        pending: pendingBookings,
        confirmed: confirmedBookings,
        delivered: deliveredBookings,
      },
    });
  } catch (error) {
    console.error("Error fetching booking stats:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default router;
