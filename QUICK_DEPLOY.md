# Quick Vercel Deployment Steps

## Required Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```
MONGO=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your-secret-key-here
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_SECRET_KEY=your-secret-key
FRONTEND_URL=https://your-app.vercel.app
```

## Deploy Commands

### First Time Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables (one by one)
vercel env add MONGO
vercel env add JWT_SECRET
vercel env add CLOUDINARY_CLOUD_NAME
vercel env add CLOUDINARY_API_KEY
vercel env add CLOUDINARY_SECRET_KEY
vercel env add FRONTEND_URL

# Deploy to production
vercel --prod
```

### Subsequent Deployments
```bash
vercel --prod
```

## Or Deploy via GitHub

1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Add environment variables in the dashboard
5. Deploy!

## Test After Deployment

1. Health check: `https://your-app.vercel.app/api/health`
2. Frontend: `https://your-app.vercel.app`

## Important Notes

- MongoDB: Allow connections from 0.0.0.0/0 in MongoDB Atlas Network Access
- All environment variables must be set before first deployment
- First build takes 2-5 minutes

