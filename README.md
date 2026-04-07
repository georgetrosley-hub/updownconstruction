## Up and Down Construction website

Static, fast, Databricks-inspired marketing site tailored to **South Jersey residential remodeling** with a **Free In‑Person Estimate** CTA.

### Run locally

Option A (no terminal): open `index.html` in a browser.

Option B (recommended): start a tiny local server (avoids browser CORS issues for `site.json`).

```bash
cd "Up and Down Construction"
python3 -m http.server 5173
```

Then visit `http://localhost:5173`.

### Update business info (phone/email/service area/services)

Edit `site.json`:

- `contact.phoneDisplay`, `contact.phoneE164`, `contact.smsE164`
- `contact.email`
- `serviceArea.counties` and `serviceArea.towns`
- `services[]` and `reviews[]`

### Add your logo

Copy your logo file into `assets/` and name it:

- `assets/logo.png`

If the logo file is missing, the site automatically falls back to a clean red “brand mark” so the layout still looks good.

### Add project photos

Replace the placeholders in `projects.html` with real images (recommended sizes: 1600px wide JPG/WebP).

Simple approach:

- Create `assets/projects/`
- Add files like `kitchen-1.jpg`, `bath-1.jpg`, etc.
- Replace each placeholder tile with an `<img>` tag

### Deployment options

- **Netlify**: drag-and-drop the folder (or connect a repo) as a static site.
- **Vercel**: works too, as a static deployment.
- **GitHub Pages**: publish the folder as a Pages site.

### Handoff checklist

- **Domain**: connect your domain and enable HTTPS
- **Analytics**: add Plausible or Google Analytics (optional)
- **Google Business Profile**: add your GBP link to the footer + `reviews.html`
- **Review capture**: add a “Leave a review” button that links to GBP review form
- **Photos**: add 10–20 before/after photos (biggest trust lever)

