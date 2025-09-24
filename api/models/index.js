import mongoose from "mongoose";

// Prashad Booking Schema
const prashadBookingSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["mahaprasad", "prashad"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: function () {
        return this.type === "mahaprasad";
      },
    },
    village: {
      type: String,
      required: function () {
        return this.type === "prashad";
      },
    },
    pincode: {
      type: String,
      required: function () {
        return this.type === "prashad";
      },
    },
    address: {
      type: String,
      required: function () {
        return this.type === "prashad";
      },
    },
    amount: {
      type: Number,
      default: function () {
        return this.type === "mahaprasad" ? 101 : 0;
      },
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "delivered", "cancelled"],
      default: "pending",
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    deliveryDate: {
      type: Date,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Community Member Schema
const communityMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    approvedDate: {
      type: Date,
    },
    memberId: {
      type: String,
      unique: true,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Gallery Image Schema
const galleryImageSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "temple",
    },
    uploadedBy: {
      type: String,
      default: "admin",
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create models
const PrashadBooking = mongoose.model("PrashadBooking", prashadBookingSchema);
const CommunityMember = mongoose.model(
  "CommunityMember",
  communityMemberSchema
);
const GalleryImage = mongoose.model("GalleryImage", galleryImageSchema);

export { PrashadBooking, CommunityMember, GalleryImage };
