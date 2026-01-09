# 🚀 Deploying Via Sancta to Vercel

## Quick Deploy (5 minutes)

### Step 1: Connect GitHub to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import from GitHub: `djcastelino/viasancta`
4. Click "Import"

### Step 2: Configure Build Settings

Vercel will auto-detect Next.js. Use these settings:

```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### Step 3: Environment Variables (Optional)

If you need any API keys later:
```
Settings → Environment Variables → Add
```

### Step 4: Deploy!

Click **"Deploy"** - Done! 🎉

Your app will be live at: `https://viasancta.vercel.app`

---

## Automatic Deployments

Every push to `main` branch automatically triggers a new deployment!

```bash
git add .
git commit -m "Update miracle data"
git push
```

→ Vercel automatically deploys → Live in ~2 minutes!

---

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project
2. Settings → Domains
3. Add: `viasancta.com` (or whatever domain you own)
4. Follow DNS setup instructions

---

## Monitoring

Check deployment status:
- Vercel Dashboard: https://vercel.com/dashboard
- Deployment logs: See build output in Vercel
- Analytics: Vercel provides free analytics

---

## Troubleshooting

### Build fails?
Check Vercel logs for errors. Common issues:
- Missing dependencies: Run `npm install` locally first
- TypeScript errors: Fix with `npm run build` locally
- Environment variables: Add in Vercel settings

### 404 on routes?
Next.js handles routing automatically. Make sure pages are in `app/` directory.

### PWA not working?
- Check `next.config.ts` has PWA config
- Service worker generates on production build only
- Test with: `npm run build && npm start`

---

## Performance Tips

✅ **Already optimized:**
- Automatic image optimization (Next.js Image component)
- Static generation for fast loading
- Code splitting (automatic)
- PWA caching (service worker)

---

## Next Steps After Deployment

1. **Test on mobile** - Open site on phone, test "Add to Home Screen"
2. **Share with beta testers** - Get feedback
3. **Monitor analytics** - See Vercel dashboard
4. **Add more tours** - Continue building content!

---

**Your app is now live! 🙏✨**

Visit: https://viasancta.vercel.app

