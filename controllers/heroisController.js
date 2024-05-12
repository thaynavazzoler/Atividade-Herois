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

async function updateHeroi(req, res) {
  const id = req.params.id;
  const { nome, poder, nivel, pontosdevida, ataque, defesa } = req.body;
  const query = 'UPDATE herois SET nome=$1, poder=$2, nivel=$3, pontosdevida=$4, ataque=$5, defesa=$6 WHERE id=$7';
  const values = [nome, poder, nivel, pontosdevida, ataque, defesa, id];

  try {
    const result = await pool.query(query, values);
    if (result.rowCount > 0) {
      res.send('Heroi atualizado com sucesso');
    } else {
      res.status(404).send('Heroi não encontrado');
    }
  } catch (err) {
    console.error('Erro ao atualizar heroi:', err);
    res.status(500).send('Erro ao atualizar heroi');
  }
}

async function deleteHeroi(req, res) {
  const id = req.params.id;
  const query = 'DELETE FROM herois WHERE id=$1';

  try {
    const result = await pool.query(query, [id]);
    if (result.rowCount > 0) {
      res.send('Heroi deletado com sucesso');
    } else {
      res.status(404).send('Heroi não encontrado');
    }
  } catch (err) {
    console.error('Erro ao deletar heroi:', err);
    res.status(500).send('Erro ao deletar heroi');
  }
}

async function getHeroiById (req, res) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM herois WHERE id = $1", [
      id,
    ]);
    res.status(200).send({
      message: "Herois encontrados com sucesso!",
      herois: rows,
    });
  } catch (error) {
    console.error("Erro ao buscar herois", error);
    res.status(500).send("Erro ao buscar herois");
  }
}

async function getHeroisByNome(req, res) {
  try {
    const { nome } = req.params;
    const { rows } = await pool.query("SELECT * FROM herois WHERE nome = $1", [
      nome,
    ]);
    if (rows.length === 0) {
      return res.status(404).send({
        message: "Nenhum herói encontrado com esse nome.",
      });
    }
    res.status(200).send({
      message: "Heróis encontrados com sucesso!",
      herois: rows,
    });
  } catch (error) {
    console.error("Erro ao buscar heróis", error);
    res.status(500).send("Erro ao buscar heróis");
  }
}

async function getHeroisByPoder (req, res)  {
  try {
    const { poder } = req.params;
    const { rows } = await pool.query("SELECT * FROM herois WHERE poder = $1", [
      poder,
    ]);
    if (rows.length === 0) {
      return res.status(404).send({
        message: "Nenhum herói encontrado com esse poder.",
      });
    }
    res.status(200).send({
      message: "Heróis encontrados com sucesso!",
      herois: rows,
    });
  } catch (error) {
    console.error("Erro ao buscar heróis", error);
    res.status(500).send("Erro ao buscar heróis");
  }
}



module.exports = { createHeroi, getAllHerois, updateHeroi, deleteHeroi, getHeroiById, getHeroisByNome, getHeroisByPoder };  
