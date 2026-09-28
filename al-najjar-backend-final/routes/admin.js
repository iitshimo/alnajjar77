// ============================================
// AL-NAJJAR BACKEND - ADMIN ROUTE
// ============================================

import express from 'express';
import { User } from '../models.js';

const adminRouter = express.Router();

adminRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, role: 'admin' });

        if (!user || user.password !== password) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        res.json({
            success: true,
            message: 'Login successful',
            user: { id: user._id, email: user.email, name: user.name }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default adminRouter;
