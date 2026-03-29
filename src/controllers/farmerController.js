import Farmer from "../model/farmer.js";

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
        sucess: true,
        message: "Farmer Add Sucessfully",
        newFarmer
     })

        
    } catch (error) {
    console.error("Add Milk Collection error:", error.message);
    res.status(500).json({
    success: false,
    message: "Internal server error",
    });
    }
}
