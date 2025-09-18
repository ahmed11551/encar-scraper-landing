import express from 'express';
import cors from 'cors';
import path from 'path';
import url from 'url';
import fs from 'fs/promises';
import cron from 'node-cron';
import { scrapeEncar } from './scraper.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, 'public')));

const DATA_FILE = path.join(__dirname, '..', 'data', 'cars.json');

async function readCars() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { scrapedAt: null, count: 0, cars: [] };
  }
}

app.get('/api/cars', async (req, res) => {
  const data = await readCars();
  res.json(data);
});

app.get('/', async (req, res) => {
  const data = await readCars();
  res.render('index', { data });
});

// Manual trigger endpoint (protected minimally by query token if provided)
app.post('/api/scrape', async (req, res) => {
  try {
    const result = await scrapeEncar();
    res.json({ ok: true, ...result });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Schedule daily at 03:00 server time
cron.schedule('0 3 * * *', async () => {
  try {
    console.log('[cron] Starting daily scrape');
    await scrapeEncar();
    console.log('[cron] Scrape complete');
  } catch (e) {
    console.error('[cron] Scrape failed', e);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});


