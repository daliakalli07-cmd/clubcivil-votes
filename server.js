const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Serveur des fichiers statiques dans /public
app.use(express.static(path.join(__dirname, 'public')));

// Stockage des stats en mémoire
const statistiques = {
  "Réseau social": 0,
  "Amis": 0,
  "Salon": 0,
  "Section": 0,
  "Autre": 0,
};

app.get('/stats', (req, res) => {
  res.json(statistiques);
});

app.post('/stats', (req, res) => {
  const source = req.body.source;
  if (statistiques.hasOwnProperty(source)) {
    statistiques[source]++;
    res.json({ success: true, stats: statistiques });
  } else {
    res.status(400).json({ success: false, message: 'Source inconnue' });
  }
});

app.post('/stats/reset', (req, res) => {
  Object.keys(statistiques).forEach(k => statistiques[k] = 0);
  res.json({ success: true, stats: statistiques });
});
const PORT = process.env.PORT || 5000;  // Vercel, Railway ou ngrok peut définir le port
const HOST = 'localhost';               // accessible depuis ton navigateur sur ce PC

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});