import express from 'express';

const app = express();

app.get('/api/filmes', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.json([
    { id: 1, titulo: 'Sonic' },
    { id: 2, titulo: 'Interestelar' },
    { id: 3, titulo: 'Avatar' },
  ]);
});

app.listen(3000, '0.0.0.0', () => {
  console.log('API rodando na porta 3000');
});
