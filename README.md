# DrawStihl

## Deploy

### Recommended GitHub Pages setup
Use **GitHub Actions** as the Pages source for this repository.

- **Settings → Pages → Source:** `GitHub Actions`

This prevents a common misconfiguration where Pages serves the wrong branch/root and publishes an unbuilt `index.html` that still references `/src/main.tsx`.

### Automatic deploy (GitHub Actions)
Workflow `.github/workflows/deploy.yml`:

1. Installs dependencies
2. Builds production assets into `dist/`
3. Verifies `dist/index.html` references built assets (not `/src/main.tsx`)
4. Publishes `dist/` with official Pages actions (`upload-pages-artifact` + `deploy-pages`)

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

then GitHub Pages is usually serving an unbuilt source `index.html` instead of `dist/index.html`.
Switching Pages source to **GitHub Actions** and running this workflow resolves it reliably.
