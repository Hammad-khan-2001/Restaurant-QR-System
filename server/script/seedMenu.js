import mongoose from "mongoose";
import Menu from "../models/Menu.js";
import menuData from "./menuData.json"; // put the 50-item JSON here

const MONGO = process.env.MONGO_URI || "mongodb://localhost:27017/yourdb";

const seed = async () => {
  try {
    await mongoose.connect(MONGO);
    console.log("Connected to DB");
    await Menu.deleteMany({});
    await Menu.insertMany(menuData);
    console.log("Seeded menu items:", menuData.length);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();