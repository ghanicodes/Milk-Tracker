import mongoose from "mongoose";

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
  },
  { timestamps: true },
);

const Retailer = mongoose.model("Retailer", retailerSchema);

export default Retailer;
