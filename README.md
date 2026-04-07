# DrawStihl

## Deploy

### GitHub Pages settings (required)
In the repository on GitHub, open **Settings → Pages** and configure the publication source as:

- **Source:** Deploy from a branch
- **Branch:** `gh-pages`
- **Folder:** `/ (root)`

> Do not use `main` + `/ (root)` for GitHub Pages in this project.

### Automatic deploy (GitHub Actions)
Workflow `.github/workflows/deploy.yml` deploys only build artifacts from `dist/` to the `gh-pages` branch.

You can trigger deployment manually from **Actions → Deploy to GitHub Pages → Run workflow**,
or with GitHub CLI:

```bash
gh workflow run .github/workflows/deploy.yml
```

### Post-deploy checks
After deployment, verify the published app and generated HTML:

1. Open `https://disstihl-lang.github.io/DrawStihl/`
2. Open page source for `index.html`
3. Ensure it:
   - does **not** contain `src="/src/main.tsx"`
   - contains links to `assets/...`

### Manual deploy
Run commands in this exact order:

1. `npm ci`
2. `npm run build`
3. Publish **only** contents of `dist/` (not project root sources)

Before publishing, verify `dist/index.html`:

- does **not** contain `src="/src/main.tsx"`
- contains links to files from `assets/`
