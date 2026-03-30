// import mongoose from "mongoose";

// const saleMilkRetailerSchema = new mongoose.Schema(
//   {
//     retailer: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Retailer",
//       required: true,
//     },
//     date: {
//       type: Date,
//       required: true,
//     },
//     milkType: {
//       type: String,
//       enum: ["Cow", "Buffalo"],
//       required: true,
//     },
//     morning: {
//       quantity: { type: Number, default: 0 },
//       pricePerLiter: { type: Number, default: 0 },
//     },
//     evening: {
//       quantity: { type: Number, default: 0 },
//       pricePerLiter: { type: Number, default: 0 },
//     },
//   },
//   { timestamps: true }
// );

// saleMilkRetailerSchema.index(
//   { retailer: 1, date: 1, milkType: 1 },
//   { unique: true }
// );

// const SaleMilkRetailer = mongoose.model("SaleMilkRetailer", saleMilkRetailerSchema );

// export default SaleMilkRetailer;





import mongoose from "mongoose";

const saleMilkRetailerSchema = new mongoose.Schema(
  {
    retailer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Retailer",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },

    morning: {
      quantity: { type: Number, default: 0 },
      pricePerLiter: { type: Number, default: 0 },
      milkType: {
        type: String,
        enum: ["Cow", "Buffalo"],
      },
    },

    evening: {
      quantity: { type: Number, default: 0 },
      pricePerLiter: { type: Number, default: 0 },
      milkType: {
        type: String,
        enum: ["Cow", "Buffalo"],
      },
    },
  },
  { timestamps: true }
);

// ✅ 1 record per retailer per day
saleMilkRetailerSchema.index(
  { retailer: 1, date: 1 },
  { unique: true }
);

const SaleMilkRetailer = mongoose.model("SaleMilkRetailer", saleMilkRetailerSchema);

export default SaleMilkRetailer;