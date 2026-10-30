# TTRPG-PCs Template

This is the presentation layer for [TTRPG-PCs](https://github.com/Payden-Pringle/TTRPG-PCs). The content repository’s GitHub Actions workflow checks out this template, exports the Obsidian vault’s `publish/` folder with `obsidian-export`, and deploys the result to Vercel.

Edit public notes in the Obsidian vault as usual. `publish/home.md` supplies the homepage title, excerpt, and introduction; other exported Markdown notes appear automatically in the archive. Internal links, search, and backlinks continue to use the exported notes.

A push to the content repository’s `main` branch triggers a deployment. After changing only this template, run **Publish Markdown Files** manually from the content repository’s Actions tab to publish the latest template with the current notes.

For local development, install dependencies with `npm ci` and run `npm run dev`. The checked-in `common_md/` directory contains starter content; the publishing workflow replaces it with exported notes.
