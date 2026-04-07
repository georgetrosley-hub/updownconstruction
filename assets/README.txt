Logo assets:
- `logo.png` — Full logo (transparent PNG). Used in the header and footer.
- `favicon-32.png` — Browser tab icon (32×32).
- `favicon-192.png` — Apple touch icon / home-screen icon (192×192).

To regenerate the logo from a new source photo (same black background treatment), run:
`python3 scripts/process_logo.py path/to/source.png assets/logo.png`
Then re-run the favicon resize in `scripts/` or recreate the small PNGs with the same Pillow resize as in the last commit.

Optional project photos: add `assets/projects/` and reference them in `projects.html`.
