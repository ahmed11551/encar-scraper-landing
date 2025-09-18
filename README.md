ENCar Scraper + Landing

Simple Node.js app that scrapes ENCAR listings daily and serves a responsive landing page with an API.

Run locally
```bash
npm install
npm run scrape   # first-time data
npm run dev      # http://localhost:3000
```

Deploy
- Any Node host (Railway, Render, Fly, VPS). Use `npm start`.
- Set a periodic trigger (or rely on built-in cron schedule at 03:00 server time).

Docker
```bash
docker build -t encar-scraper .
docker run --rm -p 3000:3000 encar-scraper
```

Endpoints
- GET `/` – landing with list
- GET `/api/cars` – JSON data
- POST `/api/scrape` – manual refresh

Notes
- For educational/demo use. Respect `encar.com` terms.
- Selectors are heuristic and may need adjustment over time.

