const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profileRouter');
const TaskRoutes = require('./routes/taskRouter');
const JournalRoutes = require('./routes/MoodRouter');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// ---- API ROUTES FIRST ----
app.use('/api', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', TaskRoutes);
app.use('/api', JournalRoutes);

// ---- THEN SERVE REACT BUILD ----
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

mongoose.connect(process.env.DB_URL)
  .then(() => console.log("DB connected succesfully"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started at port ${port}`));
