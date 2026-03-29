import mongoose from "mongoose";

const milkCollectionSchema = new mongoose.Schema(
  {
    farmer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Farmer", required: true 
    },
    date: { 
        type: Date,
        required: true 
        },
   morning: {
      amount: { type: Number, default: 0 },
      milkType: { type: String, enum: ["Cow", "Buffalo"] } 
    },
    evening: {
      amount: { type: Number, default: 0 },
      milkType: { type: String, enum: ["Cow", "Buffalo"] }
    }
  },
  { timestamps: true }
);

const MilkCollection = mongoose.model("MilkCollection", milkCollectionSchema);
export default MilkCollection;