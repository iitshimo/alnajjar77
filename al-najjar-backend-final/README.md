# 🚀 AL-NAJJAR BACKEND SETUP GUIDE

## ✅ المتطلبات | Requirements

### Arabic (العربية) 🇸🇦
- Node.js (v14+)
- MongoDB (تثبيت محلي على جهازك)
- Terminal/PowerShell أو Command Prompt

### English 🇺🇸
- Node.js (v14+)
- MongoDB (Local installation on your computer)
- Terminal/PowerShell or Command Prompt

---

## 📝 خطوات التثبيت | Setup Steps

### **الخطوة 1️⃣ - نسخ المشروع | Step 1: Copy Project**

**للويندوز (Windows):**

1. انسخ مجلد `al-najjar-backend-final` إلى أحد هذه المسارات:
   - `C:\Users\black\Documents\al-najjar-backend` أو
   - `C:\Users\black\al-najjar-backend`

**For Windows:**

Copy the `al-najjar-backend-final` folder to one of these locations:
   - `C:\Users\black\Documents\al-najjar-backend` or
   - `C:\Users\black\al-najjar-backend`

---

### **الخطوة 2️⃣ - فتح PowerShell | Step 2: Open PowerShell**

1. اضغط `Windows + R`
2. اكتب `powershell`
3. اضغط `Enter`

**النتيجة:**
```
PS C:\Users\black>
```

---

### **الخطوة 3️⃣ - الذهاب إلى مجلد المشروع | Step 3: Navigate to Project**

**إذا نسخت في Documents:**
```powershell
cd Documents\al-najjar-backend
```

**أو إذا نسخت في Users:**
```powershell
cd al-najjar-backend
```

**النتيجة:**
```
PS C:\Users\black\Documents\al-najjar-backend>
```

---

### **الخطوة 4️⃣ - التحقق من MongoDB | Step 4: Check MongoDB**

تأكد من تشغيل MongoDB على جهازك:

**في PowerShell جديد:**
```powershell
mongod
```

يجب أن ترى:
```
[initandlisten] listening on 127.0.0.1:27017
```

**لا تغلق هذا الـ PowerShell - اتركه يعمل!**

---

### **الخطوة 5️⃣ - تثبيت المكتبات | Step 5: Install Dependencies**

في PowerShell الأول (المشروع):

```powershell
npm install
```

سيستغرق دقيقة أو دقيقتين... انتظر حتى تنتهي.

**النتيجة:**
```
added 234 packages in 2m
```

---

### **الخطوة 6️⃣ - تشغيل الـ Backend | Step 6: Run Backend**

```powershell
npm run dev
```

**النتيجة:**
```
✅ Al-Najjar API is running on http://localhost:5000
MongoDB connected successfully!
```

---

## ✅ التحقق من الاتصال | Verify Connection

اذهب إلى المتصفح واكتب:

```
http://localhost:5000/api/health
```

يجب تشوف:

```json
{
  "status": "OK",
  "message": "Al-Najjar API is running ✅"
}
```

✅ **تمام! الـ Backend جاهز!**

---

## 📡 API Endpoints

| Endpoint | Method | الوصف | Description |
|----------|--------|--------|--------|
| `/api/health` | GET | فحص الـ API | API Health Check |
| `/api/products` | GET | جميع المنتجات | Get all products |
| `/api/products/:id` | GET | منتج واحد | Get single product |
| `/api/products` | POST | إضافة منتج | Create product |
| `/api/products/:id` | PUT | تعديل منتج | Update product |
| `/api/products/:id` | DELETE | حذف منتج | Delete product |
| `/api/categories` | GET | جميع الفئات | Get all categories |
| `/api/categories` | POST | إضافة فئة | Create category |
| `/api/branches` | GET | جميع الفروع | Get all branches |
| `/api/branches` | POST | إضافة فرع | Create branch |
| `/api/orders` | GET | جميع الطلبات | Get all orders |
| `/api/orders` | POST | إنشاء طلب جديد | Create order |
| `/api/orders/:id` | GET | تفاصيل الطلب | Get order details |
| `/api/orders/:id/status` | PUT | تحديث حالة الطلب | Update order status |
| `/api/contacts` | GET | جميع الرسائل | Get all messages |
| `/api/contacts` | POST | إرسال رسالة تواصل | Send contact message |
| `/api/admin/login` | POST | تسجيل دخول Admin | Admin login |

---

## 🔗 ربط React Frontend | Connect React Frontend

### في React project الخاص بك:

**أنشئ ملف:** `src/api/client.js`

```javascript
const API_URL = 'http://localhost:5000/api';

export async function getProducts() {
    const res = await fetch(`${API_URL}/products`);
    return res.json();
}

export async function getCategories() {
    const res = await fetch(`${API_URL}/categories`);
    return res.json();
}

export async function getProductsByCategory(categoryId) {
    const res = await fetch(`${API_URL}/products/category/${categoryId}`);
    return res.json();
}

export async function createOrder(orderData) {
    const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    });
    return res.json();
}

export async function sendContact(contactData) {
    const res = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
    });
    return res.json();
}

export async function adminLogin(email, password) {
    const res = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return res.json();
}
```

---

## ⚠️ ملاحظات مهمة | Important Notes

1. **MongoDB يجب يكون شغّال** ✅ قبل تشغيل الـ Backend
2. **Port 5000 يجب يكون فارغ** - إذا مشغول، عدّل `PORT` في `.env`
3. **CORS مفعّل** لـ React على `localhost:5173`
4. **الـ Admin login** بسيط جداً - في Production استخدم JWT tokens

---

## 🛠️ Troubleshooting

### **❌ MongoDB Connection Error**

**الحل:**

تأكد من تشغيل MongoDB:

```powershell
# PowerShell جديد
mongod
```

يجب ترى:
```
[initandlisten] listening on 127.0.0.1:27017
```

---

### **❌ Port 5000 Already in Use**

**الحل:**

عدّل `.env` ملف:

```
PORT=5001
```

ثم شغّل:
```powershell
npm run dev
```

---

### **❌ npm: command not found**

**الحل:**

تأكد من تثبيت Node.js:

1. اذهب إلى [nodejs.org](https://nodejs.org)
2. حمّل النسخة الـ LTS
3. ثبّت وأعد تشغيل PowerShell

---

### **❌ Module Not Found**

**الحل:**

أعد تثبيت المكتبات:

```powershell
rm -Force -Recurse node_modules
rm package-lock.json
npm install
```

---

## 📊 Project Structure

```
al-najjar-backend/
├── package.json          # Dependencies
├── .env                  # Configuration
├── server.js             # Main server file
├── models.js             # MongoDB schemas
├── routes/
│   ├── products.js       # Products endpoints
│   ├── categories.js     # Categories endpoints
│   ├── branches.js       # Branches endpoints
│   ├── orders.js         # Orders endpoints
│   ├── contacts.js       # Contact endpoints
│   └── admin.js          # Admin endpoints
└── node_modules/         # Dependencies (created by npm install)
```

---

## 📧 الدعم | Support

أي مشكلة؟ تواصل معي!

💬 أي استفسار أو مشكلة، أنا هنا لمساعدتك.

---

## ✅ Checklist قبل الانطلاق

- [ ] تثبيت Node.js
- [ ] تثبيت MongoDB
- [ ] نسخ مجلد al-najjar-backend
- [ ] تشغيل MongoDB (`mongod`)
- [ ] تشغيل `npm install`
- [ ] تشغيل `npm run dev`
- [ ] فحص `http://localhost:5000/api/health`
- [ ] ربط React Frontend

**تمام! الآن أنت جاهز! 🚀**
