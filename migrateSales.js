import mongoose from "mongoose";
import dotenv from "dotenv";
import SaleMilkRetailer from "./src/model/saleMilkRetailer.js";

dotenv.config();

console.log("Connecting to MongoDB...");
await mongoose.connect(process.env.MONGO_URI);
console.log("Connected.");

try {
  // Use native driver to bypass Mongoose schema validation for reading
  const collection = mongoose.connection.db.collection('salemilkretailers');
  
  const records = await collection.find({}).toArray();
  let migratedCount = 0;

  for (const record of records) {
    let changed = false;
    let upDateQuery = { $set: {} };

    // Check if morning is an object instead of array
    if (record.morning && !Array.isArray(record.morning) && typeof record.morning === 'object') {
      // It's the old object format, convert to array format
      const isNotEmpty = record.morning.quantity > 0;
      upDateQuery.$set.morning = isNotEmpty ? [{
        quantity: record.morning.quantity,
        pricePerLiter: record.morning.pricePerLiter,
        milkType: record.morning.milkType || "Cow"
      }] : [];
      changed = true;
    }

    // Check if evening is an object instead of array
    if (record.evening && !Array.isArray(record.evening) && typeof record.evening === 'object') {
       // It's the old object format, convert to array format
       const isNotEmpty = record.evening.quantity > 0;
       upDateQuery.$set.evening = isNotEmpty ? [{
         quantity: record.evening.quantity,
         pricePerLiter: record.evening.pricePerLiter,
         milkType: record.evening.milkType || "Cow"
       }] : [];
       changed = true;
    }

    if (changed) {
      await collection.updateOne({ _id: record._id }, upDateQuery);
      migratedCount++;
      console.log(`Migrated record ${record._id}`);
    }
  }

  console.log(`\nMigration complete. Successfully formatted ${migratedCount} old sale records to support multi-type arrays.`);
} catch (err) {
  console.error("Migration failed:", err);
} finally {
  mongoose.connection.close();
}
