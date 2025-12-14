# 404 Error Fix - API Routes Not Working

## Problem:
```
GET https://real-estate-7axv.vercel.app/api/listing/get?offer=true&limit=4 404 (Not Found)
POST https://real-estate-7axv.vercel.app/api/auth/google 404 (Not Found)
```

## Solution Steps:

### Step 1: Code Update Karein
Main ne `api/index.js` aur `vercel.json` update kar diya hai. Ab ye karein:

1. **Code ko GitHub par push karein:**
```bash
git add .
git commit -m "Fix API routes for Vercel"
git push
```

### Step 2: Vercel Dashboard Mein Check Karein

1. **Vercel Dashboard** → **Your Project** → **Deployments** mein jayein
2. Latest deployment ke **"..."** menu → **"Redeploy"** click karein
3. Ya **"Redeploy"** button directly click karein

### Step 3: Environment Variables Verify Karein

**Settings** → **Environment Variables** mein verify karein:
- ✅ `MONGO` - MongoDB connection string
- ✅ `JWT_SECRET` - Secret key
- ✅ `CLOUDINARY_CLOUD_NAME`
- ✅ `CLOUDINARY_API_KEY`
- ✅ `CLOUDINARY_SECRET_KEY`
- ✅ `FRONTEND_URL` - `https://real-estate-7axv.vercel.app`

### Step 4: Build Logs Check Karein

**Deployments** → Latest deployment → **"View Function Logs"** click karein

Check karein:
- ✅ API function build ho raha hai ya nahi
- ✅ Koi error hai ya nahi
- ✅ MongoDB connection successful hai ya nahi

### Step 5: Function Logs Check Karein

Agar deployment successful hai, to:
1. **Deployments** → **Functions** tab mein jayein
2. `/api/index.js` function check karein
3. Logs mein errors dekh sakte hain

## Alternative Solution (Agar upar wala kaam na kare):

### Option A: API Folder Structure Change

Agar phir bhi 404 aaye, to Vercel ke recommended structure use karein:

1. Root level par `api` folder banayein (agar nahi hai)
2. `api/index.js` ko root level `api` folder mein move karein
3. Ya phir `vercel.json` ko update karein

### Option B: Manual Function Creation

Vercel Dashboard mein:
1. **Settings** → **Functions** mein jayein
2. Check karein ki API functions properly detected ho rahe hain ya nahi

## Quick Test:

Deploy ke baad ye test karein:

1. **Health Check:**
   ```
   https://real-estate-7axv.vercel.app/api/health
   ```
   Response: `{"status":"ok"}` aana chahiye

2. **Agar health check bhi 404 de, to:**
   - Vercel Dashboard → **Deployments** → **Logs** check karein
   - Environment variables verify karein
   - Build process successful hai ya nahi check karein

## Common Issues:

### Issue 1: Build Command Error
- **Solution:** `vercel.json` mein build command verify karein

### Issue 2: Environment Variables Missing
- **Solution:** Saare required variables add karein

### Issue 3: MongoDB Connection Failed
- **Solution:** MongoDB Atlas mein Network Access check karein (0.0.0.0/0 allow karein)

### Issue 4: Function Not Found
- **Solution:** `vercel.json` ki routing verify karein

## Updated Files:

1. ✅ `api/index.js` - Handler function update
2. ✅ `vercel.json` - Routing configuration update

Ab code push karke redeploy karein!

