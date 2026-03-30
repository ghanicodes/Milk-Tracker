import mongoose from "mongoose";

const openRateMilkSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        pricePerLiter: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        shift: {
      type: String,
      enum: ["morning", "evening"],
      required: true,
    }
    },
    { timestamps: true }
);

openRateMilkSchema.index({ date: 1, shift: 1 }, { unique: true });

const OpenRateMilk = mongoose.model("OpenRateMilk", openRateMilkSchema);
export default OpenRateMilk;