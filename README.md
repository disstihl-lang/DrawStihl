# DrawStihl

## Deploy

### Required GitHub Pages settings
In repository settings set exactly:

- **Settings → Pages → Source:** `Deploy from a branch`
- **Branch:** `gh-pages`
- **Folder:** `/ (root)`

> If `main /(root)` is selected, the site serves source `index.html` and requests `/src/main.tsx`, which leads to `404 Not Found`.

### Automatic deploy (GitHub Actions)
Workflow `.github/workflows/deploy.yml`:

1. Checks that Pages source is `gh-pages /(root)`
2. Installs dependencies
3. Builds production assets into `dist/`
4. Verifies `dist/index.html` references built assets (not `/src/main.tsx`)
5. Publishes **only** `dist/` into `gh-pages` branch

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

GitHub Pages is serving an unbuilt source page. Fix Pages source to `gh-pages /(root)` and re-run the deploy workflow.
