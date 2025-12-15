import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import checkRole from '../middlewares/checkRole.js';
import {
  createTable,
  getAllTables,
  getTableBySlug,
  updateTable,
  deleteTable
} from '../controllers/table.controller.js';

const router = express.Router();

// ======================== TABLE ROUTES ========================

// Create a table → Admin only
router.post('/tables', verifyToken, checkRole(['admin']), createTable);

// Get table by slug → Public (used by QR scan)
router.get('/tables/:slug', getTableBySlug);

// Get all tables → Admin only
router.get('/tables', verifyToken, checkRole(['admin']), getAllTables);

// Update table → Admin only
router.put('/tables/:tableId', verifyToken, checkRole(['admin']), updateTable);

// Delete / Deactivate table → Admin only
router.delete('/tables/:tableId', verifyToken, checkRole(['admin']), deleteTable);



export default router;
