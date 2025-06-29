const express = require('express');
const jwt = require('jsonwebtoken');
const users = require('./users');
const secretQuoteRoute = require('./routes/secretQuote');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your-secret-key';

app.use(express.json()); 

// Root route
app.get('/', (req, res) => {
  res.send(' Welcome to the Secret Quote API!');
});

// Register
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password are required.' });

  const exists = users.find(u => u.username === username);
  if (exists) return res.status(409).json({ message: 'User already exists.' });

  const newUser = {
    id: users.length + 1,
    username,
    password,
  };
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully!' });
});

// Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ accessToken: token });
});

app.use('/api/secret-quote', secretQuoteRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
