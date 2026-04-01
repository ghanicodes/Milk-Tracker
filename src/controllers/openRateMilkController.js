import OpenRateMilk from "../model/openRateMilk.js";

export const addMilk = async (req, res) => {
  try {
    const { name, address, quantity, pricePerLiter, date, shift } = req.body;

    if (!name || !address || !quantity || !pricePerLiter || !date || !shift) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const collectionDate = new Date(date);
    collectionDate.setHours(0, 0, 0, 0);

    const record = await OpenRateMilk.findOneAndUpdate(
      { date: collectionDate, shift },
      {
        $set: {
          name,
          address,
          pricePerLiter,
          date: collectionDate,
          shift,
        },
        $inc: { quantity: quantity }, 
      },
      {
        new: true,
        upsert: true,
      },
    );

    res.status(201).json({
      success: true,
      message: "Open Rate Milk saved successfully",
      milk: record,
    });
  } catch (error) {
    console.error("Add Open Rate Milk error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get All Open Rate Milk
export const getAllOpenRateMilk = async (req, res) => {
  try {
    const openRateMilk = await OpenRateMilk.find().sort({ date: -1 });
    res.status(200).json({
      success: true,
      openRateMilk
    });
  } catch (error) {
    console.error("Get All Open Rate Milk error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Get Single Open Rate Milk
export const getSingleOpenRateMilk = async (req, res) => {
  try {
    const { id } = req.params;
    const openRateMilk = await OpenRateMilk.findById(id);
    res.status(200).json({
      success: true,
      openRateMilk
    });
  } catch (error) {
    console.error("Get Single Open Rate Milk error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Update Open Rate Milk
export const updateOpenRateMilk = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, quantity, pricePerLiter, date, shift } = req.body;
    const openRateMilk = await OpenRateMilk.findByIdAndUpdate(id, {
      name,
      address,
      quantity,
      pricePerLiter,
      date,
      shift
    }, { new: true });
    res.status(200).json({
      success: true,
      message: "Open Rate Milk updated successfully",
      openRateMilk
    });
  } catch (error) {
    console.error("Update Open Rate Milk error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Delete Open Rate Milk
export const deleteOpenRateMilk = async (req, res) => {
  try {
    const { id } = req.params;
    const openRateMilk = await OpenRateMilk.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Open Rate Milk deleted successfully",
      openRateMilk
    });
  } catch (error) {
    console.error("Delete Open Rate Milk error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Get Open Rate Milk By Date
export const getOpenRateMilkByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const openRateMilk = await OpenRateMilk.find({ date });
    res.status(200).json({
      success: true,
      openRateMilk
    });
  } catch (error) {
    console.error("Get Open Rate Milk By Date error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Get Open Rate Milk By Shift
export const getOpenRateMilkByShift = async (req, res) => {
  try {
    const { shift } = req.params;
    const openRateMilk = await OpenRateMilk.find({ shift });
    res.status(200).json({
      success: true,
      openRateMilk
    });
  } catch (error) {
    console.error("Get Open Rate Milk By Shift error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
