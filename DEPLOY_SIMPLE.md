# 🚀 Simple Deploy Steps (GitHub → Vercel)

## ⚡ Quick Answer:
**Backend aur Frontend dono EK SAATH deploy honge!** Koi alag se deploy karne ki zarurat nahi hai.

---

## 📝 Step-by-Step:

### STEP 1: GitHub par Code Push Karein

```bash
# Terminal mein project folder mein jayein
cd "C:\Users\NABEEL KAMBOH\Desktop\Dev_Weekends\Real_Market_Place"

# Git commands (agar pehle se git initialized hai)
git add .
git commit -m "Ready for deployment"
git push
```

**Agar pehli baar GitHub par push kar rahe hain:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

---

### STEP 2: Vercel par Project Import Karein

1. **https://vercel.com** par jayein
2. **"Sign Up"** → **"Continue with GitHub"** click karein
3. GitHub se login karein
4. Dashboard mein **"Add New..."** → **"Project"** click karein
5. Apna repository select karein
6. **"Import"** click karein

---

### STEP 3: Environment Variables Add Karein

**Settings → Environment Variables** mein ye add karein:

| Variable Name | Value | Example |
|--------------|-------|---------|
| `MONGO` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Random secret key | `mySecretKey123456` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary name | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789012345` |
| `CLOUDINARY_SECRET_KEY` | Cloudinary secret | `your-secret-key` |
| `FRONTEND_URL` | (Pehle khali, baad mein update) | `https://your-app.vercel.app` |

**Har variable ke liye:**
- Value daalein
- **Production, Preview, Development** teeno select karein
- **"Save"** click karein

---

### STEP 4: Deploy Karein

1. Saare variables add karne ke baad
2. **"Deploy"** button click karein
3. 2-5 minutes wait karein
4. Deploy complete hone ke baad URL milega

---

### STEP 5: FRONTEND_URL Update Karein

1. Deploy ke baad jo URL mila (e.g., `https://your-app.vercel.app`)
2. **Settings → Environment Variables** mein jayein
3. `FRONTEND_URL` ko edit karein
4. Value mein apna Vercel URL daalein
5. Save karein
6. Automatic redeploy ho jayega

---

### STEP 6: Test Karein

1. **API Test:** `https://your-app.vercel.app/api/health`
   - Response: `{"status":"ok"}` aana chahiye

2. **Frontend Test:** `https://your-app.vercel.app`
   - Homepage load hona chahiye

---

## ⚠️ Important:

### MongoDB Atlas:
- **Network Access** mein **"Allow Access from Anywhere"** (0.0.0.0/0) enable karein

### Agar Error Aaye:
- Vercel Dashboard → **Deployments** → **Logs** check karein
- Environment variables verify karein

---

## ✅ Done!

Ab aapka app live hai! 🎉

**Future updates ke liye:**
```bash
git add .
git commit -m "Update message"
git push
```
Vercel automatically redeploy kar dega!

