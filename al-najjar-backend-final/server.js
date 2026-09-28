import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/alnajjar';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Define Schemas
const productSchema = new mongoose.Schema({
    nameAr: String,
    nameEn: String,
    descriptionAr: String,
    descriptionEn: String,
    price: Number,
    stock: Number,
    category: { type: String, default: 'general' },
    image: String,
    createdAt: { type: Date, default: Date.now }
});

const categorySchema = new mongoose.Schema({
    nameAr: String,
    nameEn: String,
    icon: String,
    createdAt: { type: Date, default: Date.now }
});

const branchSchema = new mongoose.Schema({
    nameAr: String,
    nameEn: String,
    country: String,
    city: String,
    address: String,
    phone: String,
    email: String,
    type: String,
    createdAt: { type: Date, default: Date.now }
});

// Define Models
const Product = mongoose.model('Product', productSchema);
const Category = mongoose.model('Category', categorySchema);
const Branch = mongoose.model('Branch', branchSchema);

// Routes
// ==================== Products ====================
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ==================== Categories ====================
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/categories', async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ==================== Branches ====================
app.get('/api/branches', async (req, res) => {
    try {
        const branches = await Branch.find();
        res.json({ success: true, data: branches });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/branches', async (req, res) => {
    try {
        const branch = new Branch(req.body);
        await branch.save();
        res.json({ success: true, data: branch });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ==================== Health Check ====================
app.get('/api/health', (req, res) => {
    res.json({ success: true, message: '✅ Backend is running!' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📦 MongoDB: ${MONGODB_URI}`);
    console.log(`🌐 CORS enabled for frontend\n`);
});
