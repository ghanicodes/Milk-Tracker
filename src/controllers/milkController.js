import Farmer from "../model/farmer.js";
import MilkCollection from "../model/milkCollection.js";


// Add or Update Milk Collection
export const addMilkCollection = async (req, res) => {
  try {
    const { farmerId, date, morningAmount, morningMilkType, eveningAmount, eveningMilkType } = req.body;

    const farmer = await Farmer.findById(farmerId);
    if (!farmer) throw new Error("Farmer not found");

    // Normalize date (ignore time)
    const collectionDate = date ? new Date(date) : new Date();
    collectionDate.setHours(0, 0, 0, 0);

    // Check if record already exists
    let milkRecord = await MilkCollection.findOne({
      farmer: farmer._id,
      date: collectionDate
    });

    if (!milkRecord) {
      milkRecord = new MilkCollection({
        farmer: farmer._id,
        date: collectionDate
      });
    }

  // Morning
    if (morningAmount !== undefined) {
      milkRecord.morning.amount = morningAmount;
      milkRecord.morning.milkType = morningMilkType || farmer.defaultMilkType;
    }

    // Evening
    if (eveningAmount !== undefined) {
      milkRecord.evening.amount = eveningAmount;
      milkRecord.evening.milkType = eveningMilkType || farmer.defaultMilkType;
    }

    await milkRecord.save();
    res.status(201).json({
      success: true,
      message: "Milk collection saved successfully",
      milkRecord
    });

  } catch (error) {
    console.error("Add Milk Collection error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};