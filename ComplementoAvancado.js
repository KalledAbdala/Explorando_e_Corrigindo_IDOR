const jwt = require('jsonwebtoken');
const SECRET = 'supersecreto';

function generateToken(userId) {
  return jwt.sign({ userId }, SECRET, { expiresIn: '1h' });
}

// Exemplo de login
app.get('/login', (req, res) => {
  const token = generateToken(loggedUserId);
  res.json({ token });
});

// Middleware de verificação
function jwtMiddleware(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Token ausente.');

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = users.find(u => u.id === decoded.userId);
    if (!req.user) throw new Error();
    next();
  } catch (err) {
    res.status(403).send('Token inválido.');
  }
}

app.get('/user/profile', jwtMiddleware, (req, res) => {
  res.send(`<h2>Seu Perfil (${req.user.name})</h2><p>Email: ${req.user.email}</p>`);
});
