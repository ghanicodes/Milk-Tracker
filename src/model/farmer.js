import mongoose from "mongoose";


const farmerSchema = new mongoose.Schema(
  {
    name: { 
        type: String,
         required: true 
        },
    phone: { 
        type: String,
         required: true
         },
    advance: { 
        type: Number,
         default: 0 
        },
    defaultMilkType: {
      type: String,
      enum: ["Cow", "Buffalo"],
      required: true,
    },
  },
  { timestamps: true },
);

const Farmer = mongoose.model("Farmer", farmerSchema);
export default Farmer;
