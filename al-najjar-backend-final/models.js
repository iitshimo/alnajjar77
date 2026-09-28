// ============================================
// AL-NAJJAR BACKEND - MONGOOSE MODELS
// ============================================

import mongoose from 'mongoose';

// ============================================
// CATEGORY MODEL
// ============================================
const categorySchema = new mongoose.Schema({
    nameEn: { type: String, required: true },
    nameAr: { type: String, required: true },
    description: String,
    icon: String,
    displayOrder: { type: Number, default: 0 }
}, { timestamps: true });

export const Category = mongoose.model('Category', categorySchema);

// ============================================
// PRODUCT MODEL
// ============================================
const productSchema = new mongoose.Schema({
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    nameEn: { type: String, required: true },
    nameAr: { type: String, required: true },
    descriptionEn: String,
    descriptionAr: String,
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    sku: String,
    image: String,
    specs: {
        colorEn: String,
        colorAr: String,
        sizeEn: String,
        sizeAr: String,
        materialEn: String,
        materialAr: String
    },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true }
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);

// ============================================
// BRANCH MODEL
// ============================================
const branchSchema = new mongoose.Schema({
    nameEn: { type: String, required: true },
    nameAr: { type: String, required: true },
    branchType: { type: String, enum: ['branch', 'warehouse', 'showroom'], default: 'branch' },
    locationEn: String,
    locationAr: String,
    phone: String,
    email: String,
    latitude: Number,
    longitude: Number,
    hoursEn: String,
    hoursAr: String,
    image: String,
    active: { type: Boolean, default: true }
}, { timestamps: true });

export const Branch = mongoose.model('Branch', branchSchema);

// ============================================
// ORDER MODEL
// ============================================
const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, unique: true, required: true },
    customerName: String,
    customerEmail: String,
    customerPhone: String,
    customerAddress: String,
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        price: Number
    }],
    totalAmount: Number,
    status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    paymentMethod: String,
    notes: String
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);

// ============================================
// CONTACT MODEL
// ============================================
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    subject: String,
    message: String,
    status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' }
}, { timestamps: true });

export const Contact = mongoose.model('Contact', contactSchema);

// ============================================
// USER MODEL
// ============================================
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
    phone: String,
    address: String,
    active: { type: Boolean, default: true }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);

// ============================================
// PARTNER MODEL
// ============================================
const partnerSchema = new mongoose.Schema({
    nameEn: { type: String, required: true },
    nameAr: { type: String, required: true },
    logo: String,
    website: String,
    displayOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
}, { timestamps: true });

export const Partner = mongoose.model('Partner', partnerSchema);
