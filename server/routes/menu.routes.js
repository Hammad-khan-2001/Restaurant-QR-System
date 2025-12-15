import express from "express";
import upload from "../middlewares/upload.js";
import { addMenuItem, getMenu, updateMenuItem, deleteMenuItem, searchMenu, getSingleMenu, bulkAdd } from "../controllers/menu.controller.js";

const router = express.Router();

router.post("/add", upload.single("image"), addMenuItem);
router.get("/all", getMenu);
router.put("/update/:id", upload.single("image"), updateMenuItem);
router.delete("/delete/:id", deleteMenuItem);
router.get("/search", searchMenu);
router.get("/:id", getSingleMenu);
router.post("/bulk-add", bulkAdd)

export default router;


