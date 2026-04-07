# DrawStihl

## Deploy

### Automatic deploy (GitHub Actions)
Workflow `.github/workflows/deploy.yml` deploys only build artifacts from `dist/` to the `gh-pages` branch.

### Manual deploy
Run commands in this exact order:

1. `npm ci`
2. `npm run build`
3. Publish **only** contents of `dist/` (not project root sources)

Before publishing, verify `dist/index.html`:

- does **not** contain `src="/src/main.tsx"`
- contains links to files from `assets/`
