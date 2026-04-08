# DrawStihl

## Deploy

### Required GitHub Pages settings
Use:

- **Settings → Pages → Source:** `GitHub Actions`

> If you don't see/select `gh-pages` in branch list, this is the correct mode. This repository deploys via Actions artifacts, not via a publishing branch.

### Automatic deploy (GitHub Actions)
Workflow `.github/workflows/deploy.yml`:

1. Installs dependencies
2. Builds production assets into `dist/`
3. Verifies `dist/index.html` references built assets (not `/src/main.tsx`)
4. Uploads `dist/` as Pages artifact
5. Deploys artifact to GitHub Pages environment

You can trigger deployment manually from **Actions → Deploy to GitHub Pages → Run workflow**.

### Post-deploy checks
After deployment, verify:

1. Open `https://disstihl-lang.github.io/DrawStihl/`
2. Open DevTools → Network
3. Ensure there is **no** request to `/src/main.tsx`
4. Ensure JS/CSS are loaded from `/DrawStihl/assets/...`

### Typical 404 root cause
If you see:

- `GET .../src/main.tsx 404 (Not Found)`

GitHub Pages is serving an unbuilt source page. Switch Pages source to `GitHub Actions` and re-run deploy workflow.
