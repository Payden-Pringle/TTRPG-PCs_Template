# Payden’s website template

This is the presentation layer for the [TTRPG-PCs content repository](https://github.com/Payden-Pringle/TTRPG-PCs). Its GitHub Actions workflow exports the Obsidian vault’s `publish/` directory with `obsidian-export`, builds this template, and deploys to Vercel.

The general homepage is authored in `publish/home.md`. `publish/ttrpgs.md` is the TTRPG landing page; Markdown notes under `publish/ttrpgs/` automatically appear in its archive and live under `/ttrpgs/`. Other top-level notes appear on the general homepage. Internal links, search, and backlinks use the exported notes. The old `/about-me` and `/session-0` paths redirect to the new TTRPG paths.

Pushing the content repository’s `main` branch triggers a deployment. After changing only this template, run **Publish Markdown Files** from the content repository’s Actions tab to deploy the latest template with the current notes.

For local development, run `npm ci` and `npm run dev`. The checked-in `common_md/` contains starter content and is replaced by exported notes during deployment.
