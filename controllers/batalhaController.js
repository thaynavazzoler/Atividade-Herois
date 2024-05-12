const pool = require('../config/dbConfig');

const { addHistorico } = require('./historicoController');

async function batalhar(req, res) {
  try {
    const { idHeroi1, idHeroi2 } = req.params;
    // Consulta ao banco de dados para obter informações do primeiro herói
    const { rows: rowsHeroi1 } = await pool.query(
      "SELECT * FROM herois WHERE id = $1",
      [idHeroi1]
    );
    // Consulta ao banco de dados para obter informações do segundo herói
    const { rows: rowsHeroi2 } = await pool.query(
      "SELECT * FROM herois WHERE id = $1",
      [idHeroi2]
    );
// Verifica se os heróis existem
    if (rowsHeroi1.length === 0 || rowsHeroi2.length === 0) {
      return res.status(404).send({
        message: "Heróis não encontrados.",
      });
    }
// Extrai informações dos heróis
    const heroi1 = rowsHeroi1[0];
    const heroi2 = rowsHeroi2[0];
// Calcula as vidas restantes dos heróis após a batalha
    const vidaHeroi1 = heroi1.pontosdevida - heroi2.ataque + heroi1.defesa;
    const vidaHeroi2 = heroi2.pontosdevida - heroi1.ataque + heroi2.defesa;
// Determina o vencedor da batalha com base nas vidas restantes
    if (vidaHeroi1 > vidaHeroi2) {
      return res.status(200).send({
        message: `O herói ${heroi1.nome} venceu a batalha!`,
        heroiVencedor: heroi1,
      });
    } else if (vidaHeroi2 > vidaHeroi1) {
      return res.status(200).send({
        message: `O herói ${heroi2.nome} venceu a batalha!`,
        heroiVencedor: heroi2,
      });
    } else {
      return res.status(200).send({
        message: "A batalha terminou em empate.",
      });
    }
  } catch (error) {
// Tratamento de erros durante a execução da rota
    console.error("Erro ao buscar heróis", error);
    res.status(500).send("Erro ao buscar heróis");
  }
}

module.exports = { batalhar };
