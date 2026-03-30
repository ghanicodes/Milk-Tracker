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
        $inc: { quantity: quantity }, // yaha add karega existing quantity me
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
