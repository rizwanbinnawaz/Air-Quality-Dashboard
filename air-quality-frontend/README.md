# Air Quality Dashboard

This is a full-stack project built with **Next.js**, **Node.js**, and **MongoDB** to visualize hourly air quality data collected from March 2004 to February 2005. The data includes concentrations of CO, Benzene, NOx, NO2, and other sensor readings.

---

## Features

- Visualize time-series air quality data using interactive charts
- Select specific parameters like `CO`, `Benzene`, `NOx`, etc.
- Filter records by date range
- Responsive, modern UI built with Tailwind CSS and `shadcn/ui`

---

## Demo Video

- Please check video attched in email

---

## Project Clone
```bash
git clone https://github.com/rizwanbinnawaz/Air-Quality-Dashboard.git
```

## Frontend (Next.js 14)

This is the frontend for the Air Quality Dashboard built with **Next.js**, **Tailwind CSS**, **shadcn/ui**, and **Recharts**.

### Getting Started

#### Requirements
- Node.js `^18.18.0` or newer

#### Install & Run

```bash
cd air-quality-frontend
npm install
npm run dev
```

Then open:

```
http://localhost:3000
```

### File Highlights

| File/Folder             | Purpose                                      |
|-------------------------|----------------------------------------------|
| `app/page.tsx`          | Main dashboard view + chart rendering        |
| `components`            | All Reuseable components                     |
| `tailwind.config.js`    | Tailwind CSS configuration                   |
| `public/`               | Static files                                 |

### Libraries Used

- Next.js - Full-stack React framework
- Tailwind CSS - Utility-first styling
- shadcn/ui - (Prebuilt UI components
- Recharts - Data visualization/charting
- Axios - Api Integrations
- date-fns - Lightweight date utilities

---

## Backend (Node.js + Express + MongoDB)

The backend provides API endpoints for querying air quality data from MongoDB.

### Setup

```bash
cd air-quality-api
npm install
```

Edit/Create `.env` file with your MongoDB connection string:

```
MONGO_URI=mongodb+srv://...
PORT=5000
```

---

## Demo Database

- Please check email for real databse use in video

---

### Run the Server

```bash
npm run start
```

### Ingest CSV Data

```bash
npm run data
```

###Clear All Records

```bash
npm run clear
```

---

## 🔌 API Endpoints

| Method | Route                                  | Description                    |
|--------|----------------------------------------|--------------------------------|
| GET    | `/api/data/parameter/:param`           | Time series for a parameter   |
| GET    | `/api/data/range?from=YYYY-MM-DD&to=...` | Filter data by date range     |
| DELETE | `/api/data/clear`                      | (Optional) Clear all records  |

---

## Dataset

- File: `AirQualityUCI.csv`
- Records: 9,358 hourly rows
- Parameters:
  - `CO(GT)`, `C6H6(GT)`, `NMHC(GT)`, `NOx(GT)`, `NO2(GT)`
  - Metal oxide sensor values
  - `T` (Temperature), `RH` (Humidity), `AH` (Absolute Humidity)

---

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, shadcn/ui, Recharts
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB

---

## Muhammad Rizwan

- Full Stack Developer
- rizwanbinnawaz@gmail.com
- +971 52 557 1270
