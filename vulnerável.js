const express = require('express');
const app = express();
const PORT = 3000;

const users = [
  { id: 1, name: 'Alice', email: 'alice@email.com' },
  { id: 2, name: 'Bob', email: 'bob@email.com' },
  { id: 3, name: 'Carol', email: 'carol@email.com' }
];

// Simula usuário autenticado:
const loggedUserId = 2;

// Vulnerável a IDOR
app.get('/user/profile', (req, res) => {
  const userId = parseInt(req.query.id);
  const user = users.find(u => u.id === userId);
  if (user) {
    res.send(`<h2>Perfil de ${user.name}</h2><p>Email: ${user.email}</p>`);
  } else {
    res.status(404).send('Usuário não encontrado.');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
