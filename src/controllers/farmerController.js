import Farmer from "../model/farmer.js";

// Add Farmer
export const addFarmer = async (req, res) => {
    try {
        const { name, phone, advance, defaultMilkType } = req.body;
        console.log(name, phone, advance, defaultMilkType);
        
        const newFarmer = await Farmer.create({
            name,
            phone,
            advance,
            defaultMilkType
        });

        res.status(201).json({
            success: true,
            message: "Farmer Add Successfully",
            newFarmer
        });

        
    } catch (error) {
        console.error("Add Farmer error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

// Get All Farmers
export const getAllFarmers = async (req, res) => {
    try {
        const farmers = await Farmer.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            farmers
        });
    } catch (error) {
        console.error("Get All Farmers error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

// Get Single Farmer
export const getSingleFarmer = async (req, res) => {
    try {
        const { id } = req.params;
        const farmer = await Farmer.findById(id);
        res.status(200).json({
            success: true,
            farmer
        });
    } catch (error) {
        console.error("Get Single Farmer error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

// Update Farmer
export const updateFarmer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, advance, defaultMilkType } = req.body;
        const farmer = await Farmer.findByIdAndUpdate(id, {
            name,
            phone,
            advance,
            defaultMilkType
        }, { new: true });
        res.status(200).json({
            success: true,
            message: "Farmer updated successfully",
            farmer
        });
    } catch (error) {
        console.error("Update Farmer error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

// Delete Farmer
export const deleteFarmer = async (req, res) => {
    try {
        const { id } = req.params;
        const farmer = await Farmer.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Farmer deleted successfully",
            farmer
        });
    } catch (error) {
        console.error("Delete Farmer error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

// Get Farmer By Phone Number
export const getFarmerByPhone = async (req, res) => {
    try {
        const { phone } = req.params;
        const farmer = await Farmer.findOne({ phone });
        res.status(200).json({
            success: true,
            farmer
        });
    } catch (error) {
        console.error("Get Farmer By Phone error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
