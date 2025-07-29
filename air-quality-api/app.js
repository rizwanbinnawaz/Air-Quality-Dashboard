const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const dataRoutes = require('./routes/dataRoutes');

const app = express();
connectDB();

const cors = require('cors');
app.use(cors());

app.use('/api/data', dataRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
