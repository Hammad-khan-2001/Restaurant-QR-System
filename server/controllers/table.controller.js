import crypto from 'crypto';
import QRCode from 'qrcode';
import Table from '../models/table.js';
import { successResponse } from '../utils/successResponse.js';


// ======================== CREATE TABLE ========================
export const createTable = async (req, res) => {
  console.log("Request received for createTable");
  try {
    const { tableNumber, capacity } = req.body;

    // Check if table number exists
    const existingTable = await Table.findOne({ tableNumber });
    if (existingTable) {
      return res.status(400).json({ message: 'Table number already exists' });
    }

    // Generate QR slug
    const qrSlug = crypto.randomBytes(6).toString('hex');

    // QR code URL
    const qrCodeURL = `https://scanbite-restaurant.vercel.app/?qr=${qrSlug}`;

    // Generate QR image using Promise API
    const qrImage = await QRCode.toDataURL(qrCodeURL);

    const table = new Table({
      tableNumber,
      capacity,
      qrImage,
      qrCodeURL,
      qrSlug,
    });

    await table.save();

    res.status(201).json({
      success: true,
      data: table,
    });
  } catch (error) {
    console.error(error);  // for debugging
    res.status(500).json({ message: error.message });
  }
};

// ======================== GET TABLE BY SLUG ========================

export const getTableBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    // 🔥 isActive condition hata do
    const table = await Table.findOne({ qrSlug: slug });

    if (!table) {
      return res.status(404).json({
        success: false,
        message: "No Table found with this slug"
      });
    }

    // ✅ QR scan = table activate
    if (!table.isActive) {
      table.isActive = true;
      await table.save();
    }

    res.status(200).json({
      success: true,
      data: table
    });

  } catch (error) {
    next(error);
  }
};


// ======================== GET ALL TABLES ========================
export const getAllTables = async (req, res) => {
  try {
    const tables = await Table.find(); // make sure Table is imported correctly
    res.status(200).json({ success: true, data: tables });
  } catch (error) {
    console.error("GetAllTables Error:", error); // <- this will print exact error in terminal
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ======================== UPDATE TABLE ========================

export const updateTable = async (req, res, next) => {
  try {
    const { tableId } = req.params;
    const { capacity, isActive } = req.body;

    const table = await Table.findById(tableId);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    if (capacity !== undefined) table.capacity = capacity;
    if (isActive !== undefined) table.isActive = isActive;

    await table.save();
    res.status(200).json({ success: true, data: table });
  } catch (error) {
    next(error);
  }
}

// ======================== DELETE TABLE ========================
export const deleteTable = async (req, res, next) => {
  try {
    const { tableId } = req.params;
    const table = await Table.findById(tableId);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    // Soft delete
    table.isActive = false;
    await table.save();
    res.status(200).json({ success: true, message: "Table deactivated" });
  } catch (error) {
    next(error);
  }
}

