# DrawStihl

## Deploy

### GitHub Pages settings (for immediate compatibility)
In repository settings use:

- **Settings → Pages → Source:** `Deploy from a branch`
- **Branch:** `gh-pages`
- **Folder:** `/ (root)`

This matches the workflow in this repo and works without additional migration steps.

### Automatic deploy (GitHub Actions)
Workflow `.github/workflows/deploy.yml`:

1. Installs dependencies
2. Builds production assets into `dist/`
3. Verifies `dist/index.html` references built assets (not `/src/main.tsx`)
4. Publishes **only** `dist/` into `gh-pages` branch

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

then GitHub Pages is serving an unbuilt source `index.html` instead of `dist/index.html`.
This workflow prevents that by deploying only build artifacts from `dist/`.
