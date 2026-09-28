// ============================================
// AL-NAJJAR BACKEND - BRANCHES ROUTE
// ============================================

import express from 'express';
import { Branch } from '../models.js';

const branchesRouter = express.Router();

branchesRouter.get('/', async (req, res) => {
    try {
        const branches = await Branch.find({ active: true });
        res.json({ success: true, data: branches });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

branchesRouter.post('/', async (req, res) => {
    try {
        const branch = new Branch(req.body);
        await branch.save();
        res.status(201).json({ success: true, data: branch });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

export default branchesRouter;
