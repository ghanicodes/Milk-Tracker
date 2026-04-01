import mongoose from "mongoose";


const ledgerSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["debit", "credit"], // debit = payment to farmer, credit = milk value/other
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
    balance: {
        type: Number,
        default: 0
    },
    ledger: [ledgerSchema],
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
