import express from "express";
import { CommunityMember } from "../models/index.js";

const router = express.Router();

// Generate unique member ID
const generateMemberId = async () => {
  const count = await CommunityMember.countDocuments();
  return `SC${String(count + 1).padStart(4, "0")}`;
};

// Join community
router.post("/join", async (req, res) => {
  try {
    const { name, fatherName, religion, pincode, email, contactNo, notes } =
      req.body;

    // Validate required fields
    if (!name || !fatherName || !religion || !pincode || !email || !contactNo) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if email already exists
    const existingMember = await CommunityMember.findOne({ email });
    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Generate member ID
    const memberId = await generateMemberId();

    const member = new CommunityMember({
      name,
      fatherName,
      religion,
      pincode,
      email,
      contactNo,
      memberId,
      notes,
    });

    await member.save();

    res.status(201).json({
      success: true,
      message: "Community join request submitted successfully",
      data: {
        memberId: member.memberId,
        status: member.status,
        joinDate: member.joinDate,
      },
    });
  } catch (error) {
    console.error("Error joining community:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Get all community members (admin only)
router.get("/members", async (req, res) => {
  try {
    const { status, religion, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (religion) filter.religion = religion;

    const members = await CommunityMember.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await CommunityMember.countDocuments(filter);

    res.json({
      success: true,
      data: members,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    console.error("Error fetching community members:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Get member by ID
router.get("/members/:id", async (req, res) => {
  try {
    const member = await CommunityMember.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.json({
      success: true,
      data: member,
    });
  } catch (error) {
    console.error("Error fetching member:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Update member status (admin only)
router.patch("/members/:id/status", async (req, res) => {
  try {
    const { status, notes } = req.body;

    if (!status || !["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Valid status is required",
      });
    }

    const updateData = { status };
    if (status === "approved") {
      updateData.approvedDate = new Date();
    }
    if (notes) updateData.notes = notes;

    const member = await CommunityMember.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.json({
      success: true,
      message: "Member status updated successfully",
      data: member,
    });
  } catch (error) {
    console.error("Error updating member status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Delete member (admin only)
router.delete("/members/:id", async (req, res) => {
  try {
    const member = await CommunityMember.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting member:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Get community statistics
router.get("/stats/overview", async (req, res) => {
  try {
    const totalMembers = await CommunityMember.countDocuments();
    const pendingMembers = await CommunityMember.countDocuments({
      status: "pending",
    });
    const approvedMembers = await CommunityMember.countDocuments({
      status: "approved",
    });
    const rejectedMembers = await CommunityMember.countDocuments({
      status: "rejected",
    });

    // Get religion distribution
    const religionStats = await CommunityMember.aggregate([
      {
        $group: {
          _id: "$religion",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    // Get monthly join statistics
    const monthlyStats = await CommunityMember.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
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
        total: totalMembers,
        pending: pendingMembers,
        approved: approvedMembers,
        rejected: rejectedMembers,
        religionDistribution: religionStats,
        monthlyJoins: monthlyStats,
      },
    });
  } catch (error) {
    console.error("Error fetching community stats:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Check member status by email
router.get("/check-status/:email", async (req, res) => {
  try {
    const member = await CommunityMember.findOne({ email: req.params.email });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Email not found in community records",
      });
    }

    res.json({
      success: true,
      data: {
        memberId: member.memberId,
        status: member.status,
        joinDate: member.joinDate,
        approvedDate: member.approvedDate,
      },
    });
  } catch (error) {
    console.error("Error checking member status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default router;
