const pool = require('../config/dbConfig');

async function getHistorico(req, res) {
 
    try {
      
      const { rows } = await pool.query(
        "SELECT h.nome AS vencedor, h2.nome AS perdedor, data FROM historico JOIN herois h ON h.id = historico.vencedor JOIN herois h2 ON h2.id = historico.perdedor;"
      );
   
      res.status(200).send({
        message: "Histórico de batalhas encontrado com sucesso!",
        historico: rows,
      });
    } catch (error) {
      console.error("Erro ao buscar histórico", error);
      res.status(500).send("Erro ao buscar histórico");
    }
  }
module.exports = { 
  getHistorico 
};
