import Farmer from "../model/farmer.js";
import MilkCollection from "../model/milkCollection.js";

// Add or Update Milk Collection
export const addMilkCollection = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const { date, morningAmount, morningMilkType, eveningAmount, eveningMilkType } = req.body;

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

// Get Milk Collection
export const getMilkCollection = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const milkRecords = await MilkCollection.find({ farmer: farmerId }).sort({ date: -1 });
    res.status(200).json({
      success: true,
      milkRecords
    });
  } catch (error) {
    console.error("Get Milk Collection error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get All Milk Collections
export const getAllMilkCollections = async (req, res) => {
  try {
    const milkRecords = await MilkCollection.find().populate('farmer', 'name phone').sort({ date: -1 });
    res.status(200).json({
      success: true,
      milkRecords
    });
  } catch (error) {
    console.error("Get All Milk Collections error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete Milk Collection
export const deleteMilkCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const milkRecord = await MilkCollection.findByIdAndDelete(id);
    if (!milkRecord) throw new Error("Milk collection not found");
    res.status(200).json({
      success: true,
      message: "Milk collection deleted successfully",
    });
  } catch (error) {
    console.error("Delete Milk Collection error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update Milk Collection
export const updateMilkCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, morningAmount, morningMilkType, eveningAmount, eveningMilkType } = req.body;

    const milkRecord = await MilkCollection.findById(id);
    if (!milkRecord) throw new Error("Milk collection not found");

    // Normalize date (ignore time)
    const collectionDate = date ? new Date(date) : new Date();
    collectionDate.setHours(0, 0, 0, 0);

    // Morning
    if (morningAmount !== undefined) {
      milkRecord.morning.amount = morningAmount;
      milkRecord.morning.milkType = morningMilkType || milkRecord.morning.milkType;
    }

    // Evening
    if (eveningAmount !== undefined) {
      milkRecord.evening.amount = eveningAmount;
      milkRecord.evening.milkType = eveningMilkType || milkRecord.evening.milkType;
    }

    await milkRecord.save();
    res.status(200).json({
      success: true,
      message: "Milk collection updated successfully",
      milkRecord
    });

  } catch (error) {
    console.error("Update Milk Collection error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get Milk Collection by Date
export const getMilkCollectionByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const milkRecords = await MilkCollection.find({ date }).populate('farmer', 'name phone');
    res.status(200).json({
      success: true,
      milkRecords
    });
  } catch (error) {
    console.error("Get Milk Collection by Date error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get Milk Collection by Farmer and Date
export const getMilkCollectionByFarmerAndDate = async (req, res) => {
  try {
    const { farmerId, date } = req.params;
    const milkRecords = await MilkCollection.find({ farmer: farmerId, date }).populate('farmer', 'name phone');
    res.status(200).json({
      success: true,
      milkRecords
    });
  } catch (error) {
    console.error("Get Milk Collection by Farmer and Date error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get Milk Collection by Farmer and Date Range
export const getMilkCollectionByFarmerAndDateRange = async (req, res) => {
  try {
    const { farmerId, startDate, endDate } = req.params;
    const milkRecords = await MilkCollection.find({ farmer: farmerId, date: { $gte: startDate, $lte: endDate } }).populate('farmer', 'name phone');
    res.status(200).json({
      success: true,
      milkRecords
    });
  } catch (error) {
    console.error("Get Milk Collection by Farmer and Date Range error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get Milk Collection by Date Range
export const getMilkCollectionByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.params;
    const milkRecords = await MilkCollection.find({ date: { $gte: startDate, $lte: endDate } }).populate('farmer', 'name phone');
    res.status(200).json({
      success: true,
      milkRecords
    });
  } catch (error) {
    console.error("Get Milk Collection by Date Range error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get Milk Collection by Farmer and Milk Type
export const getMilkCollectionByFarmerAndMilkType = async (req, res) => {
  try {
    const { farmerId, milkType } = req.params;
    const milkRecords = await MilkCollection.find({ farmer: farmerId, milkType }).populate('farmer', 'name phone');
    res.status(200).json({
      success: true,
      milkRecords
    });
  } catch (error) {
    console.error("Get Milk Collection by Farmer and Milk Type error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};