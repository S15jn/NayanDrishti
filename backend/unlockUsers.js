import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import User from "./models/User.js";

const mongoUri =
  process.env.MONGO_URI;

try {
  await mongoose.connect(mongoUri);

  const result = await User.updateMany(
    {},
    {
      $set: {
        failedLoginAttempts: 0,
        lockUntil: null,
      },
    },
  );

  console.log(
    `Unlocked users. Matched: ${result.matchedCount}, modified: ${result.modifiedCount}`,
  );

  await mongoose.disconnect();
  process.exit(0);
} catch (err) {
  console.error("Unlock users failed:", err.message);
  process.exit(1);
}
