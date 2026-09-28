// ============================================
// AL-NAJJAR BACKEND - CATEGORIES ROUTE
// ============================================

import express from 'express';
import { Category } from '../models.js';

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res) => {
    try {
        const categories = await Category.find().sort({ displayOrder: 1 });
        res.json({ success: true, data: categories });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

categoriesRouter.post('/', async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json({ success: true, data: category });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

export default categoriesRouter;
