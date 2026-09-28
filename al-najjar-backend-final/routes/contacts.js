// ============================================
// AL-NAJJAR BACKEND - CONTACTS ROUTE
// ============================================

import express from 'express';
import { Contact } from '../models.js';

const contactsRouter = express.Router();

contactsRouter.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, data: contacts });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

contactsRouter.post('/', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json({ success: true, message: 'Message received!' });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

export default contactsRouter;
