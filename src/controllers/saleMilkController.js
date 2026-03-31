import SaleMilkRetailer from "../model/saleMilkRetailer.js";
import Retailer from "../model/retailer.js";

// Sale Milk for Retailer
export const addSaleMilkRetailer = async (req, res) => {
  try {
    const { retailerId, date, morning = {}, evening = {} } = req.body;

    if (!retailerId || !date) {
      return res.status(400).json({
        success: false,
        message: "Retailer ID and date are required",
      });
    }

    const retailer = await Retailer.findById(retailerId);
    if (!retailer) {
      return res.status(404).json({
        success: false,
        message: "Retailer not found",
      });
    }

    const collectionDate = new Date(date);
    collectionDate.setHours(0, 0, 0, 0);

    const updateData = {};

    // ✅ Morning logic
    if (morning.quantity !== undefined) {
      const milkType = morning.milkType || retailer.defaultMilkType;

      updateData.morning = {
        quantity: morning.quantity,
        milkType: milkType,
        pricePerLiter:
          morning.pricePerLiter ||
          (milkType === "Cow"
            ? retailer.milkPrices.cow
            : retailer.milkPrices.buffalo),
      };
    }

    // ✅ Evening logic
    if (evening.quantity !== undefined) {
      const milkType = evening.milkType || retailer.defaultMilkType;

      updateData.evening = {
        quantity: evening.quantity,
        milkType: milkType,
        pricePerLiter:
          evening.pricePerLiter ||
          (milkType === "Cow"
            ? retailer.milkPrices.cow
            : retailer.milkPrices.buffalo),
      };
    }

    const saleRecord = await SaleMilkRetailer.findOneAndUpdate(
      { retailer: retailerId, date: collectionDate },
      { $set: updateData },
      { upsert: true, returnDocument: "after" }
    );

    res.status(201).json({
      success: true,
      message: "Sale milk saved successfully",
      saleRecord,
    });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get Sale Milk for Retailer
export const getSaleMilkRetailer = async (req, res) => {
  try {
    const { retailerId } = req.params;
    const saleRecords = await SaleMilkRetailer.find({ retailer: retailerId }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      saleRecords,
    });
  } catch (error) {
    console.error("Get Sale Milk error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  } 
};

// Get Single Sale Milk Record for Retailer
export const getSingleSaleMilkRetailer = async (req, res) => {
   try {
    const { retailerId, saleId } = req.params;
    const saleRecord = await SaleMilkRetailer.findOne({ _id: saleId, retailer: retailerId });

    if (!saleRecord) {
      return res.status(404).json({
        success: false,
        message: "Sale record not found",
      });
    }
    res.status(200).json({
      success: true,
      saleRecord,
    });
  } catch (error) {
    console.error("Get Single Sale Milk error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get Sale Milk for Retailer by Date
export const getSaleMilkByDateRetailer = async (req, res) => {
  try {
    const { retailerId } = req.params;
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date query parameter is required",
      });
    }

    const collectionDate = new Date(date);
    collectionDate.setHours(0, 0, 0, 0);
    const saleRecord = await SaleMilkRetailer.findOne({ retailer: retailerId, date: collectionDate });

    if (!saleRecord) {
      return res.status(404).json({
        success: false,
        message: "Sale record not found for the given date",
      });
    }
    res.status(200).json({
      success: true,
      saleRecord,
    });
  } catch (error) {
    console.error("Get Sale Milk by Date error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get Sale Milk for Retailer by Date Range
export const getSaleMilkByDateRangeRetailer = async (req, res) => {
  try {
    const { retailerId } = req.params;
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Start date and end date query parameters are required",
      });
    }

    const startDateTime = new Date(startDate);
    startDateTime.setHours(0, 0, 0, 0);

    const endDateTime = new Date(endDate);
    endDateTime.setHours(23, 59, 59, 999);

    const saleRecords = await SaleMilkRetailer.find({
      retailer: retailerId,
      date: { $gte: startDateTime, $lte: endDateTime },
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      saleRecords,
    });
  } catch (error) {
    console.error("Get Sale Milk by Date Range error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete Sale Milk Record for Retailer
export const deleteSaleMilkRetailer = async (req, res) => {
  try {
    const { retailerId, saleId } = req.params;
    const deletedRecord = await SaleMilkRetailer.findOneAndDelete({ _id: saleId, retailer: retailerId });
    if (!deletedRecord) {
      return res.status(404).json({
        success: false,
        message: "Sale record not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Sale record deleted successfully",
    });
  } catch (error) {
    console.error("Delete Sale Milk error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
