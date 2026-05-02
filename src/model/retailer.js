import mongoose from "mongoose";

const retailerLedgerSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["debit", "credit"], // debit = sale (owes more), credit = payment (owes less)
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

const retailerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
     defaultMilkType: {
      type: String,
      // enum: ["Cow", "Buffalo"],
      required: true,
    },
    milkPrices: {
      cow: { type: Number, default: 0 },
      buffalo: { type: Number, default: 0 },
    },
    balance: {
      type: Number,
      default: 0,
    },
    ledger: [retailerLedgerSchema],
  },
  { timestamps: true },
);

const Retailer = mongoose.model("Retailer", retailerSchema);

export default Retailer;
