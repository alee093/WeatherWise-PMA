# WeatherWise 🌦️

A full-stack weather dashboard that lets users search weather by city or current location, view a 5-day forecast, get AI-style travel recommendations, and manage a full history of their searches (Create, Read, Update, Delete, Export).

Built by **Alejandro Baran** for the PM Accelerator AI Engineer Intern Technical Assessment (Full Stack).

---

## 🚀 Live Demo

- **Frontend:** `https://weather-wise-pma-jnnb.vercel.app`
- **Backend API:** `https://weather-wise-pma.vercel.app`

## 🎥 Demo Video
`https://www.loom.com/share/6fc4614b90014702a59029dc01388fbc`

---

## 🧱 Tech Stack

**Frontend**
- React 19 (Vite)
- Axios
- React-Leaflet (interactive map)
- Vanilla CSS (responsive, mobile-first breakpoints)

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose (NoSQL persistence)
- Axios (for outbound API calls)

**External APIs**
- [Open-Meteo](https://open-meteo.com/) — real-time weather + 5-day forecast (no API key required)
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) — city name → coordinates
- [Nominatim (OpenStreetMap)](https://nominatim.org/) — reverse geocoding for "use my location"
- Google Maps (deep link) + Leaflet/OpenStreetMap (embedded interactive map)

---

## ✨ Features

### Core
- 🔍 Search weather by city name
- 📍 "Use my location" via browser geolocation
- 🌡️ Current conditions: temperature, feels-like, humidity, wind, pressure, visibility, UV index
- 📅 5-day forecast (min/max temps + weather condition per day)
- 🧠 AI-style summary and contextual recommendations (clothing, travel, hydration, etc.) based on live conditions
- 🗺️ Interactive map of the searched location + direct link to Google Maps
- ⚠️ Graceful error handling (invalid city, failed requests, no geolocation support)
- 📱 Fully responsive (desktop, tablet, mobile)

### Persistence (CRUD) — MongoDB
Every search is saved to the database, scoped to the browser via a generated `clientId` (no login required):

| Operation | Endpoint | Description |
|---|---|---|
| **Create** | `POST /api/history` | Automatically stores every search result |
| **Read** | `GET /api/history` | Returns history, filterable by city and date range |
| **Update** | `PUT /api/history/:id` | Edit a saved record's city and/or temperature |
| **Delete** | `DELETE /api/history/:id` | Remove a saved record |

### Data Export
From the History panel, users can export their saved search history to:
- **JSON**
- **CSV**

---

## 📂 Project Structure

```
WeatherWise/
├── backend/
│   ├── api/index.js          # Vercel serverless entry point
│   ├── app.js                 # Express app setup
│   ├── server.js              # Local dev entry point
│   ├── config/database.js     # MongoDB connection
│   ├── controllers/           # Route handlers
│   ├── routes/                # Express routers
│   ├── services/               # Business logic (weather fetch, history CRUD)
│   ├── models/History.js      # Mongoose schema
│   └── vercel.json
│
└── frontend/
    ├── src/
    │   ├── components/        # Header, SearchBar, WeatherCard, Forecast,
    │   │                       # AiAssistant, Recommendation, Map, History, Footer
    │   ├── pages/Home/
    │   ├── services/api.js    # Axios client
    │   └── utils/
    └── vite.config.js
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+
- A MongoDB connection string (local MongoDB or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd WeatherWise
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

Run it:
```bash
npm run dev
```
The API will be available at `http://localhost:3000/api`.

### 3. Frontend setup
Open a new terminal:
```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:
```
VITE_API_URL=http://localhost:3000/api
```

Run it:
```bash
npm run dev
```
The app will be available at `http://localhost:5173` (default Vite port).

---

## 🌐 API Reference

### Weather
```
GET /api/weather?city=London
GET /api/weather?lat=51.5074&lon=-0.1278
```

### History
```
GET    /api/history?city=&from=&to=
POST   /api/history
PUT    /api/history/:id
DELETE /api/history/:id
```
All history requests require an `x-client-id` header (generated automatically by the frontend and stored in `localStorage`).

---

## ☁️ Deployment

Both `frontend/` and `backend/` are deployed independently on **Vercel** as two separate projects from the same monorepo:

- **Backend project** → Root Directory set to `backend`, with `MONGODB_URI` set as an environment variable.
- **Frontend project** → Root Directory set to `frontend`, with `VITE_API_URL` pointing to the deployed backend's `/api` path.

MongoDB Atlas Network Access is configured to allow connections from anywhere (`0.0.0.0/0`) to support Vercel's dynamic serverless IPs.

---

## 🎓 About Product Manager Accelerator

The Product Manager Accelerator Program is designed to support PM professionals through every stage of their career. From students looking for entry-level jobs to Directors looking to take on a leadership role, our program has helped over hundreds of students fulfill their career aspirations.

Our Product Manager Accelerator community is ambitious and committed. Through our program they have learned, honed and developed new PM and leadership skills, giving them a strong foundation for their future endeavors.

🔗 [PM Accelerator on LinkedIn](https://www.linkedin.com/company/product-manager-accelerator/)

---

## 👤 Author

**Alejandro Baran**
Technical Assessment submission — AI Engineer Intern (Full Stack)
