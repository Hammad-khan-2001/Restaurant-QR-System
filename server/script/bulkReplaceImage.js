import mongoose from "mongoose";
import cloudinary from "../configs/cloudinary.js";
import Menu from "../models/menu.js";

const start = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/restaurant");

  console.log("Connected to DB");

  const items = await Menu.find();

  for (let item of items) {
    try {
      console.log("Uploading:", item.name);

      const upload = await cloudinary.uploader.upload(item.img, {
        folder: "menu_items",
      });

      item.img = upload.secure_url;
      await item.save();

      console.log("✔ Updated:", item.name);
    } catch (err) {
      console.log("❌ Error uploading:", item.name, err.message);
    }
  }

  console.log("DONE!");
  process.exit();
};

start();
