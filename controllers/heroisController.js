const pool = require('../config/dbConfig');

async function createHeroi(req, res) {
  const { nome, poder, nivel, pontosdevida, ataque, defesa } = req.body;
  const query = 'INSERT INTO herois (nome, poder, nivel, pontosdevida, ataque, defesa) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [nome, poder, nivel, pontosdevida, ataque, defesa];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar heroi:', err);
    res.status(500).send('Erro ao criar heroi');
  }
}

async function getAllHerois(req, res) {
  try {
    const result = await pool.query('SELECT * FROM herois');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao obter herois:', err);
    res.status(500).send('Erro ao obter herois');
  }
}