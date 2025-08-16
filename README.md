# London Perinatal Health Data Dashboard (Production)

Interactive, multimedia data dashboard exploring perinatal care in London with borough-level views, maps, and charts.

**Live site:** https://london-perinatal-production.up.railway.app/#borough

---

## Stack

- **Frontend:** React (JavaScript, HTML5, CSS)
- **Charts / data viz:** D3.js (line chart(s), table sorting, color scales)
- **Map:** Choropleth of London boroughs using GeoJSON
- **Layout:** lightweight, responsive layout (tested desktop/tablet/mobile)
- **Backend / local server:** Node/Express (see `server/`)
- **Hosting / deploy:** Railway  

---

## Features

- **Four views**
  - **Most Recent Data – Citywide:** headline indicators in cards.
  - **Most Recent Data – By Borough:** indicator selector + data for selected indicator by borough (sortable table + London borough choropleth with color legend) + context panel for selected indicator.
  - **Data Over Time – Citywide:** indicator selector + line chart showing change over time citywide for selected indicator.
  - **Data Over Time – By Borough:** indicator selector + borough selector + line chart showing change over time for selected indicator and borough.
- **Indicator selector** (dropdown) to switch measures.
- **Context panel** with: Definition, Rationale, Disclosure Control, Caveats, Notes.
- **Footer sources** linking to OHID Public Health Profiles / Fingertips API.
- **Responsive layout** (works on desktop and mobile).

---

## Project Structure
```
.
├─ client/                # frontend (HTML/CSS/JS, charts, map, UI)
├─ server/                # Node/Express backend used for serving the app
├─ indicator-data.csv     # dataset used in the UI
├─ package.json           # project metadata & scripts
├─ package-lock.json      # exact dependency tree (auto-generated)
└─ README.md              # project documentation
```

---

## Getting Started 

**Option A — Node/Express (if `server/` serves the app)**
```bash
   npm install
   npm start
```
   Visit the printed localhost URL.

**Option B — Static server**

- Python 3:
```bash
   python3 -m http.server 8080
   (then open http://localhost:8080)
```
- Node via npx:
```bash
   npx serve .
```

**Option C — VS Code “Live Server” extension** (GUI-based)  
Install the “Live Server” extension in VS Code, then right-click `index.html` → Open with Live Server.

---

## Deployment

Deployed on **Railway**. Use environment variables on Railway for any API keys (e.g., MapTiler) so secrets aren’t committed.

**Production:** Deployed from branch `fix/connection-pooling` on Railway.

---


## Data Sources & Credits

- **Public Health data:** [Office for Health Improvement and Disparities (OHID)](https://www.gov.uk/government/organisations/office-for-health-improvement-and-disparities) — [Public Health Profiles](https://fingertips.phe.org.uk/), via the [Fingertips API](https://fingertips.phe.org.uk/api).

- **London borough boundaries (GeoJSON):** [Office for National Statistics (ONS)](https://www.ons.gov.uk/) — *Local Authority Districts (December 2024) Boundaries UK*, from the [Open Geography Portal](https://geoportal.statistics.gov.uk/). Licensed under the [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/).


---

## License

MIT © Dakota Bragato