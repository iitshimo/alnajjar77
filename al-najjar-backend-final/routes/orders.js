// ============================================
// AL-NAJJAR BACKEND - ORDERS ROUTE
// ============================================

import express from 'express';
import { Order } from '../models.js';

const ordersRouter = express.Router();

ordersRouter.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('items.productId').sort({ createdAt: -1 });
        res.json({ success: true, data: orders });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

ordersRouter.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.productId');
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
        res.json({ success: true, data: order });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

ordersRouter.post('/', async (req, res) => {
    try {
        const orderNumber = `ORD-${Date.now()}`;
        const order = new Order({ ...req.body, orderNumber });
        await order.save();
        res.status(201).json({ success: true, data: order });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

ordersRouter.put('/:id/status', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json({ success: true, data: order });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

export default ordersRouter;
