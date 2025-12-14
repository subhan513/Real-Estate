# Vercel Deployment Guide

This guide will help you deploy both the frontend and backend of this Real Market Place application to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. MongoDB Atlas account (or your MongoDB connection string)
3. Cloudinary account (for image uploads)
4. Firebase account (for OAuth - already configured)

## Step 1: Prepare Your Environment Variables

You need to set the following environment variables in Vercel:

### Backend Environment Variables (Required)

1. **MONGO** - Your MongoDB connection string
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`

2. **CLOUDINARY_CLOUD_NAME** - Your Cloudinary cloud name
   - Get this from your Cloudinary dashboard

3. **CLOUDINARY_API_KEY** - Your Cloudinary API key
   - Get this from your Cloudinary dashboard

4. **CLOUDINARY_SECRET_KEY** - Your Cloudinary secret key
   - Get this from your Cloudinary dashboard

5. **JWT_SECRET** - Secret key for JWT tokens (REQUIRED)
   - Generate a secure random string
   - Example: Use `openssl rand -base64 32` or any secure random string generator

6. **FRONTEND_URL** (optional) - Your Vercel frontend URL
   - Example: `https://your-app.vercel.app`
   - This is used for CORS configuration
   - If not set, CORS will allow all origins (not recommended for production)

### Frontend Environment Variables (Optional)

1. **VITE_API_URL** - Leave empty or set to your Vercel API URL
   - In production, relative paths will work since both are on the same domain
   - Example: (leave empty for relative paths)

## Step 2: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Navigate to your project root:
   ```bash
   cd C:\Users\NABEEL KAMBOH\Desktop\Dev_Weekends\Real_Market_Place
   ```

4. Deploy:
   ```bash
   vercel
   ```

5. Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? (Select your account)
   - Link to existing project? **No** (for first deployment)
   - What's your project's name? (Enter a name or press Enter)
   - In which directory is your code located? **./** (press Enter)
   - Want to override the settings? **No** (press Enter)

6. Add environment variables:
   ```bash
   vercel env add MONGO
   vercel env add JWT_SECRET
   vercel env add CLOUDINARY_CLOUD_NAME
   vercel env add CLOUDINARY_API_KEY
   vercel env add CLOUDINARY_SECRET_KEY
   vercel env add FRONTEND_URL
   ```
   (Add values when prompted for each variable)

7. Redeploy with environment variables:
   ```bash
   vercel --prod
   ```

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your Git repository (GitHub, GitLab, or Bitbucket)
3. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (root)
   - **Build Command**: `cd client && npm install && npm run build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `npm install`

4. Add Environment Variables:
   - Go to Project Settings → Environment Variables
   - Add all the required variables listed above
   - Make sure to add them for Production, Preview, and Development

5. Deploy!

## Step 3: Verify Deployment

1. After deployment, Vercel will provide you with a URL like `https://your-app.vercel.app`
2. Test the API endpoints:
   - Health check: `https://your-app.vercel.app/api/health`
   - Should return: `{"status":"ok"}`

3. Test the frontend:
   - Visit `https://your-app.vercel.app`
   - Try signing up/signing in
   - Test creating a listing

## Troubleshooting

### API Routes Not Working

- Check that `api/index.js` exports the Express app as default
- Verify environment variables are set correctly
- Check Vercel function logs in the dashboard

### Frontend Not Loading

- Verify the build output directory is `client/dist`
- Check that the build command runs successfully
- Review build logs in Vercel dashboard

### CORS Errors

- Make sure `FRONTEND_URL` environment variable is set to your Vercel domain
- Check that CORS is properly configured in `api/index.js`

### Database Connection Issues

- Verify your MongoDB connection string is correct
- Check that your MongoDB Atlas IP whitelist includes Vercel's IPs (or use 0.0.0.0/0 for all)
- Ensure your MongoDB user has proper permissions

### Image Upload Issues

- Verify Cloudinary credentials are correct
- Check Cloudinary environment variables in Vercel

## Project Structure

```
Real_Market_Place/
├── api/                 # Backend API (Express.js)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.js         # Main serverless entry point
├── client/              # Frontend (React + Vite)
│   ├── src/
│   ├── dist/            # Build output (generated)
│   └── package.json
├── vercel.json          # Vercel configuration
└── package.json         # Root package.json
```

## Important Notes

1. **MongoDB Connection**: Make sure your MongoDB Atlas allows connections from anywhere (0.0.0.0/0) or add Vercel's IP ranges.

2. **Cookie Settings**: The app uses cookies for authentication. Make sure your domain settings are correct.

3. **File Uploads**: Image uploads go through Cloudinary, so make sure your Cloudinary account is active.

4. **Environment Variables**: Never commit `.env` files. All secrets should be in Vercel's environment variables.

5. **Build Time**: The first build might take a few minutes. Subsequent builds are faster.

## Support

If you encounter issues:
1. Check Vercel function logs in the dashboard
2. Check build logs for errors
3. Verify all environment variables are set
4. Test API endpoints directly using the Vercel URL

Good luck with your deployment! 🚀

