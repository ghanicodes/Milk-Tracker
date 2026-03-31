import HomeDelivery from "../model/homeDelivery.js";

// Add Home Delivery (Daily Milk + Ledger)
export const addHomeDelivery = async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      customerAddress,
      area,
      milkType,
      quantity,
      pricePerLiter,
      startDate,
      deliverySchedule,
      customDays,
      paymentType,
    } = req.body;

    // Calculate first day amount
    const firstDayAmount = quantity * pricePerLiter;

    const homeDelivery = new HomeDelivery({
      customerName,
      customerPhone,
      customerAddress,
      area,
      milkType,
      quantity,
      pricePerLiter,
      startDate,
      deliverySchedule,
      customDays,
      paymentType,
      // Initialize ledger with first debit
      ledger: [
        {
          type: "debit",
          amount: firstDayAmount,
          date: startDate,
          description: `Milk charge for ${startDate}`,
        },
      ],
      // Initialize balance
      balance: firstDayAmount,
      // Initialize deliveryHistory with first day
      deliveryHistory: [
        {
          date: startDate,
          status: "delivered",
          quantity: quantity,
        },
      ],
    });

    await homeDelivery.save();

    res.status(201).json({
      success: true,
      message: "Home delivery added successfully with first day ledger and delivery",
      homeDelivery,
    });
  } catch (error) {
    console.error("Add Home Delivery error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// Add Daily / Custom Milk Delivery
export const addDelivery = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { deliveryDate, status, quantity } = req.body;

    // Find customer
    const customer = await HomeDelivery.findById(customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Default values
    const deliveryStatus = status || "delivered";
    const deliveryQuantity = quantity || customer.quantity; // default = registered quantity

    // Add delivery record
    customer.deliveryHistory.push({
      date: deliveryDate,
      status: deliveryStatus,
      quantity: deliveryQuantity,
    });

    // Ledger & balance only if delivered
    if (deliveryStatus === "delivered") {
      const amount = deliveryQuantity * customer.pricePerLiter;

      customer.ledger.push({
        type: "debit",
        amount: amount,
        date: deliveryDate,
        description: `Milk charge for ${deliveryDate} (${deliveryQuantity} kg)`,
      });

      customer.balance += amount;
    }

    await customer.save();

    res.status(200).json({
      success: true,
      message: `Delivery added successfully with status: ${deliveryStatus} and quantity: ${deliveryQuantity}`,
      balance: customer.balance,
      deliveryHistory: customer.deliveryHistory,
      ledger: customer.ledger,
    });
  } catch (error) {
    console.error("Add Delivery error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get All Home Deliveries
export const getAllHomeDeliveries = async (req, res) => {
  try {
    const homeDeliveries = await HomeDelivery.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      homeDeliveries,
    });

    } catch (error) {
    console.error("Get All Home Deliveries error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// Get Single Home Delivery
export const getHomeDelivery = async (req, res) => {
  try {
    const { customerId } = req.params;
    const homeDelivery = await HomeDelivery.findById(customerId);
    if (!homeDelivery) {
      return res.status(404).json({
        success: false,
        message: "Home delivery not found",
      });
    }

    res.status(200).json({
      success: true,
      homeDelivery,
    });
     } catch (error) {
    console.error("Get Single Home Delivery error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// Update Home Delivery
export const updateHomeDelivery = async (req, res) => {
  try {
    const { customerId } = req.params;
    const {
      customerName,
      customerPhone,
      customerAddress,
      area,
      milkType,
      quantity,
      pricePerLiter,
      startDate,
      deliverySchedule,
      customDays,
      paymentType,
      isActive,
    } = req.body;

    // Find customer
    const customer = await HomeDelivery.findById(customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Update fields only if provided
    if (customerName) customer.customerName = customerName;
    if (customerPhone) customer.customerPhone = customerPhone;
    if (customerAddress) customer.customerAddress = customerAddress;
    if (area) customer.area = area;
    if (milkType) customer.milkType = milkType;
    if (quantity !== undefined) customer.quantity = quantity;
    if (pricePerLiter !== undefined) customer.pricePerLiter = pricePerLiter;
    if (startDate) customer.startDate = startDate;
    if (deliverySchedule) customer.deliverySchedule = deliverySchedule;
    if (customDays) customer.customDays = customDays;
    if (paymentType) customer.paymentType = paymentType;
    if (isActive !== undefined) customer.isActive = isActive;

    await customer.save();

    res.status(200).json({
      success: true,
      message: "Home delivery updated successfully",
      homeDelivery: customer,
    });
  } catch (error) {
    console.error("Update Home Delivery error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// Delete Home Delivery (Cancel Subscription)
export const deleteHomeDelivery = async (req, res) => {
  try {    const { customerId } = req.params;
    const customer = await HomeDelivery.findByIdAndDelete(customerId);
    if (!customer) {
        return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Home delivery deleted successfully",
    });
  } catch (error) {
    console.error("Delete Home Delivery error:", error.message);
    res.status(500).json({
        success: false,
        message: "Internal server error",
    });
  }
};

