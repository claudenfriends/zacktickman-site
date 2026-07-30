# zacktickman.com

Astro static site. Findings are markdown files.

## Publish a new finding

1. Create `src/content/findings/your-slug.md`
2. Fill the frontmatter (see `app-lock-content-leakage.md` for the shape)
3. Commit and push. Cloudflare Pages builds automatically.

Status values: `unresolved` `fixed` `disputed` `open`.
An amber dot means live/unresolved, a hollow dot means settled.

## Local

    npm install
    npm run dev      # localhost:4321
    npm run build    # -> dist/

## Deploy (Cloudflare Pages)

1. Push this repo to GitHub
2. Cloudflare dashboard -> Compute -> Workers & Pages -> Create -> Pages -> Connect to Git
3. Build command: `npm run build`   Output directory: `dist`
4. Custom domains -> add `zacktickman.com` and `www.zacktickman.com`

DNS is already on Cloudflare, so the records are added for you.
