# London Perinatal (Production)

Interactive, multimedia article & data visualisation exploring perinatal care in London with borough-level views, maps, and charts.

**Live site:** https://london-perinatal-production.up.railway.app/#borough

---

## Stack

- **Frontend:** HTML5, CSS3, JavaScript (vanilla)
- **Layout/UI helpers:** UIkit (for layout only)
- **Charts / Data viz:** D3.js
- **Maps:** Leaflet with MapTiler styles (DATAVIZ.LIGHT / DATAVIZ.DARK)
- **Backend / local server:** Node/Express (folder: `server/`)
- **Hosting / deploy:** Railway

---

## Features

- Borough-level “#borough” view for quick comparisons
- Interactive Leaflet map with styled tiles
- Charts built with D3
- Minimal layout styled with UIkit
- Mobile-first; generous margins on larger screens

---

## Project Structure

.
├─ client/                # frontend assets (HTML, CSS, JS, charts, etc.)
├─ server/                # backend (Node/Express)
├─ indicator-data.csv     # dataset used in the project
├─ package.json           # project metadata & dependencies
├─ package-lock.json      # exact dependency tree (auto-generated)
└─ README.md              # project documentation

---

## Getting Started 

These are example ways someone can run the project locally. (You do **not** need to run these now; they are here for future readers.)

**Option A — Node/Express (if `server/` serves the app)**
1) Install dependencies:
   npm install
2) Start:
   npm start
3) Visit the printed localhost URL.

**Option B — Static server**
1) Using Python 3:
   python3 -m http.server 8080
   (then open http://localhost:8080)
2) Or with Node via npx:
   npx serve .

**Option C — VS Code “Live Server” extension** (GUI-based)

---

## Deployment

Deployed on **Railway**. Use environment variables on Railway for any API keys (e.g., MapTiler) so secrets aren’t committed.

---

## Data Sources & Credits

- Map data © OpenStreetMap contributors
- Map tiles © MapTiler / OpenMapTiles
- Additional datasets/APIs as used in the project

---

## License

MIT © Dakota Bragato