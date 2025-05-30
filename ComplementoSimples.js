function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).send('Não autorizado.');
  }

  const userId = parseInt(authHeader);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(403).send('Usuário inválido.');
  }

  req.user = user;
  next();
}

app.get('/user/profile', authMiddleware, (req, res) => {
  res.send(`<h2>Seu Perfil (${req.user.name})</h2><p>Email: ${req.user.email}</p>`);
});
