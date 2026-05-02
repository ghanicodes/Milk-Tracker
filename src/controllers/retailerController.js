import Retailer from "../model/retailer.js";

// Add Retailer
export const addRetailer = async (req, res) => {
  try {
    const { name, phone, address, defaultMilkType, milkPrices = {} } = req.body;

    if (!name || !phone || !address || !defaultMilkType) {
      return res.status(400).json({
        success: false,
        message: "Name, phone, address, and default milk type are required",
      });
    }

    const existingRetailer = await Retailer.findOne({ phone });
    if (existingRetailer) {
      return res.status(400).json({
        success: false,
        message: "Retailer already exists with this phone number",
      });
    }


    const newRetailer = await Retailer.create({
      name,
      phone,
      address,
      defaultMilkType,
      milkPrices: {
        cow: milkPrices?.cow || 0,
        buffalo: milkPrices?.buffalo || 0,
      },
    });

    res.status(201).json({
      success: true,
      message: "Milk Retailer saved successfully",
      retailer: newRetailer,
    });
  } catch (error) {
    console.error("Add Retailer error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// Get Retailer
export const getRetailer = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    // Total count
    const total = await Retailer.countDocuments();

    // Data with pagination
    const retailers = await Retailer.find()
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,

      // 📊 Extra info
      total, // total records
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),

      // 📦 Actual data
      count: retailers.length,
      retailers,
    });

  } catch (error) {
    console.error("Get Retailer error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// get Single Retailer
export const getSingleRetailer = async (req, res) => {
  try {
    const { retailerId } = req.params;
    const retailer = await Retailer.findById(retailerId);

    if (!retailer) {
      return res.status(404).json({
        success: false,
        message: "Retailer not found",
      });
    }

    res.status(200).json({
      success: true,
      retailer,
    });
  } catch (error) {
    console.error("Get Single Retailer error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// Delete Retailer
export const deleteRetailer = async (req, res) => {
  try {
    const { retailerId } = req.params;
    const retailer = await Retailer.findByIdAndDelete(retailerId);
    if (!retailer) {
      return res.status(404).json({
        success: false,
        message: "Retailer not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Retailer deleted successfully",
    });
  } catch (error) {
    console.error("Delete Retailer error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// Update Retailer
export const updateRetailer = async (req, res) => {
  try {
    const { retailerId } = req.params;
    const { name, phone, address, defaultMilkType, milkType, price } = req.body;

    const updateData = {};

    // Basic fields
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;

    // Default milk type
    if (defaultMilkType) {
      updateData.defaultMilkType = defaultMilkType;
    }

    // Dynamic milk price
    if (milkType && price) {
      updateData[`milkPrices.${milkType.toLowerCase()}`] = price;
    }

    const updatedRetailer = await Retailer.findByIdAndUpdate(
      retailerId,
      { $set: updateData },
      { returnDocument: "after" }
    );

    if (!updatedRetailer) {
      return res.status(404).json({
        success: false,
        message: "Retailer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Retailer updated successfully",
      retailer: updatedRetailer,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
};

// Record Retailer Payment (Credit to Ledger — reduces balance owed)
export const addRetailerPayment = async (req, res) => {
  try {
    const { retailerId } = req.params;
    const { amount, date, description } = req.body;

    const retailer = await Retailer.findById(retailerId);
    if (!retailer) {
      return res.status(404).json({
        success: false,
        message: "Retailer not found",
      });
    }

    const paymentAmount = Number(amount);
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment amount",
      });
    }

    // Add credit entry (retailer paying reduces what they owe)
    retailer.ledger.push({
      type: "credit",
      amount: paymentAmount,
      date: date || new Date(),
      description: description || "Payment Received",
    });

    // Decrease balance (they owe less now)
    retailer.balance -= paymentAmount;

    await retailer.save();

    res.status(200).json({
      success: true,
      message: "Payment recorded successfully",
      retailer,
    });
  } catch (error) {
    console.error("Add Retailer Payment error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Set Daily Retailer Payment (Idempotent: replaces payment for a specific date)
export const setDailyRetailerPayment = async (req, res) => {
  try {
    const { retailerId } = req.params;
    const { amount, date } = req.body;

    const retailer = await Retailer.findById(retailerId);
    if (!retailer) {
      return res.status(404).json({
        success: false,
        message: "Retailer not found",
      });
    }

    const paymentAmount = Number(amount) || 0;
    const paymentDate = new Date(date).toDateString();

    // 1. Identify all existing credit entries for this specific date
    const oldCreditEntries = retailer.ledger.filter(
      (entry) => entry.type === "credit" && new Date(entry.date).toDateString() === paymentDate
    );

    // 2. Restore balance by adding back the old payment amounts
    const oldPaymentTotal = oldCreditEntries.reduce((sum, entry) => sum + entry.amount, 0);
    retailer.balance += oldPaymentTotal;

    // 3. Remove old credit entries for this date
    retailer.ledger = retailer.ledger.filter(
      (entry) => !(entry.type === "credit" && new Date(entry.date).toDateString() === paymentDate)
    );

    // 4. Add new credit entry if amount > 0
    if (paymentAmount > 0) {
      retailer.ledger.push({
        type: "credit",
        amount: paymentAmount,
        date: date || new Date(),
        description: "Payment Received (Daily)",
      });

      // 5. Deduct new amount from the restored balance
      retailer.balance -= paymentAmount;
    }

    await retailer.save();

    res.status(200).json({
      success: true,
      message: paymentAmount > 0 ? "Daily payment updated" : "Daily payment removed",
      retailer,
    });
  } catch (error) {
    console.error("Set Daily Payment error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Reset all retailer balances and ledgers to zero
export const resetAllRetailerBalances = async (req, res) => {
  try {
    const result = await Retailer.updateMany(
      {},
      {
        $set: {
          balance: 0,
          ledger: [],
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "All retailer balances and ledgers have been reset to zero.",
      count: result.modifiedCount,
    });
  } catch (error) {
    console.error("Reset All Balances error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};