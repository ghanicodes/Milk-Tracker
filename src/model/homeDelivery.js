import mongoose from "mongoose";

const ledgerSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["debit", "credit"], // debit = lena hai, credit = mil gaya
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: String,
});

const deliveryHistorySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["delivered", "missed"],
    default: "delivered",
  },
  quantity: Number,
});

const homeDeliverySchema = new mongoose.Schema(
  {
    // Customer Info
    customerName: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    customerAddress: {
      type: String,
      required: true,
    },
    area: String,

    //  Milk Info
    milkType: {
      type: String,
      enum: ["cow", "buffalo", "mix"],
      required: true,
    },
    quantity: {
      type: Number, // per day liters
      required: true,
    },
    pricePerLiter: {
      type: Number,
      required: true,
    },

    // Delivery Setup
    startDate: {
      type: Date,
      required: true,
    },
    deliverySchedule: {
      type: String,
      enum: ["daily", "alternate", "custom"],
      default: "daily",
    },
    customDays: [String],

    // Delivery Tracking
    deliveryHistory: [deliveryHistorySchema],

    // Payment System
    paymentType: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      default: "monthly",
    },

    ledger: [ledgerSchema],

    balance: {
      type: Number,
      default: 0,
    },

    // Status
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const HomeDelivery = mongoose.model("HomeDelivery", homeDeliverySchema);

export default HomeDelivery;