const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');
const cors = require('cors');

const app = express();
const db = new Database('/data/verifiche.db'); // Questo lo salva sul "disco" di Render

app.use(express.json());
app.use(cors());
app.use(express.static('.')); // Serve i file della cartella

// Crea la tabella se non esiste
db.exec("CREATE TABLE IF NOT EXISTS verifiche (id INTEGER PRIMARY KEY, materia TEXT, data TEXT, descrizione TEXT)");

// API per vedere le verifiche
app.get('/api/verifiche', (req, res) => {
    const rows = db.prepare("SELECT * FROM verifiche ORDER BY data ASC").all();
    res.json(rows);
});

// API per aggiungere una verifica
app.post('/api/verifiche', (req, res) => {
    const { materia, data, descrizione } = req.body;
    db.prepare("INSERT INTO verifiche (materia, data, descrizione) VALUES (?, ?, ?)").run(materia, data, descrizione);
    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server online sulla porta ${PORT}`));