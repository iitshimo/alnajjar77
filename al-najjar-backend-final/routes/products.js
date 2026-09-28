// ============================================
// AL-NAJJAR BACKEND - PRODUCTS ROUTE
// ============================================

import express from 'express';
import { Product } from '../models.js';

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({ active: true })
            .populate('categoryId')
            .sort({ createdAt: -1 });
        res.json({ success: true, data: products });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET products by category
router.get('/category/:categoryId', async (req, res) => {
    try {
        const products = await Product.find({
            categoryId: req.params.categoryId,
            active: true
        }).sort({ createdAt: -1 });
        res.json({ success: true, data: products });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('categoryId');
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        res.json({ success: true, data: product });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// CREATE product (Admin)
router.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ success: true, data: product });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// UPDATE product (Admin)
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, data: product });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// DELETE product (Admin)
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
