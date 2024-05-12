require('dotenv').config();
const express = require('express');
const batalharRoutes = require('./routes/batalhaRoutes');
const heroisRoutes = require('./routes/heroisRoutes');
const historicoRoutes = require('./routes/historicoRoutes');

const app = express();
const port = process.env.PORT || 3000;  

app.use(express.json());

app.use('/batalhar', batalharRoutes);
app.use('/herois', heroisRoutes);
app.use('/historico', historicoRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}🧙🪄✨`);
});