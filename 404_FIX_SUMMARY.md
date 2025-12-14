# 🔧 404 Error Fix - Step by Step

## Problem:
```
GET /api/listing/get?offer=true&limit=4 404 (Not Found)
POST /api/auth/google 404 (Not Found)
```

## ✅ Fixes Applied:

### 1. `api/index.js` - Updated
- ✅ MongoDB connection optimized for serverless
- ✅ Connection caching added
- ✅ Middleware added to ensure DB connection on each request
- ✅ Proper Express app export for Vercel

### 2. `vercel.json` - Simplified
- ✅ Removed duplicate rewrites
- ✅ Clean routing configuration

## 🚀 Ab Ye Karein:

### Step 1: Code Push Karein
```bash
git add .
git commit -m "Fix 404 error - API routes"
git push
```

### Step 2: Vercel par Redeploy Karein

**Option A: Automatic (GitHub Integration)**
- Code push ke baad Vercel automatically redeploy kar dega

**Option B: Manual Redeploy**
1. Vercel Dashboard → Your Project
2. **"Deployments"** tab
3. Latest deployment ke **"..."** menu → **"Redeploy"**
4. Ya **"Redeploy"** button directly click karein

### Step 3: Environment Variables Verify Karein

**Settings** → **Environment Variables** mein ye check karein:

✅ **MONGO** - MongoDB connection string
✅ **JWT_SECRET** - Secret key  
✅ **CLOUDINARY_CLOUD_NAME** - Cloudinary name
✅ **CLOUDINARY_API_KEY** - API key
✅ **CLOUDINARY_SECRET_KEY** - Secret key
✅ **FRONTEND_URL** - `https://real-estate-7axv.vercel.app`

**Important:** `FRONTEND_URL` mein apna actual Vercel URL daalna hai!

### Step 4: Build Logs Check Karein

Deploy ke baad:
1. **Deployments** → Latest deployment
2. **"View Function Logs"** ya **"Build Logs"** click karein
3. Check karein:
   - ✅ Build successful hai
   - ✅ API function detected ho raha hai
   - ✅ MongoDB connection successful hai

### Step 5: Test Karein

1. **Health Check:**
   ```
   https://real-estate-7axv.vercel.app/api/health
   ```
   Response: `{"status":"ok"}` aana chahiye

2. **Frontend:**
   ```
   https://real-estate-7axv.vercel.app
   ```
   Homepage load hona chahiye

3. **API Endpoints:**
   - Sign Up / Sign In try karein
   - Listings load ho rahe hain ya nahi check karein

## ⚠️ Agar Phir Bhi 404 Aaye:

### Check 1: Function Logs
- Vercel Dashboard → **Deployments** → **Functions** tab
- `/api/index.js` function check karein
- Logs mein errors dekh sakte hain

### Check 2: Environment Variables
- Saare variables properly set hain ya nahi
- `FRONTEND_URL` correct hai ya nahi

### Check 3: MongoDB Connection
- MongoDB Atlas → **Network Access**
- **0.0.0.0/0** allow kiya hai ya nahi

### Check 4: Build Process
- Build logs mein koi error hai ya nahi
- Dependencies properly install ho rahe hain ya nahi

## 📝 Changes Made:

### `api/index.js`:
- MongoDB connection caching
- Serverless-optimized connection handling
- Middleware to ensure DB connection
- Proper Express export

### `vercel.json`:
- Simplified routing
- Removed duplicate configurations

## ✅ Expected Result:

Deploy ke baad:
- ✅ `/api/health` → `{"status":"ok"}`
- ✅ `/api/listing/get` → Listings data
- ✅ `/api/auth/signin` → Authentication works
- ✅ Frontend properly loads

---

**Code push karke redeploy karein!** 🚀

