const express = require('express');
const router = express.Router();
const connection = require('./connection');

// Get all registrations
router.get('/registration', (req, res) => {
    const query = "SELECT * FROM register";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

// Delete a registration by username
router.delete('/registration/:username', (req, res) => {
    const username = req.params.username;
    const query = "DELETE FROM register WHERE username = ?";
    connection.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error deleting registration:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Registration deleted successfully' });
    });
});

// Update a registration by username
router.patch('/registration/:username', (req, res) => {
  const username = req.params.username;
  const { email, password } = req.body;
  const query = "UPDATE register SET email = ?, password = ? WHERE username = ?";
  connection.query(query, [email, password, username], (err, results) => {
      if (err) {
          console.error('Error updating registration:', err);
          return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
          return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User updated successfully" });
  });
});
// Register a new user
router.post('/registration', (req, res) => {
  const { username, email, password } = req.body;
  console.log(username,email,password);
  // Check if username already exists
  const checkQuery = "SELECT * FROM register WHERE username = ?";
  connection.query(checkQuery, [username], (err, results) => {
      if (err) {
          console.error('Error checking username:', err);
          return res.status(500).send('Server error');
      }
      if (results.length > 0) {
          return res.status(400).json({ message: 'Username already taken' });
      }
      
      // Insert new user if username is unique
      const insertQuery = "INSERT INTO register (username, email, password) VALUES (?, ?, ?)";
      connection.query(insertQuery, [username, email, password], (err) => {
          if (err) {
              console.error('Error registering user:', err);
              return res.status(500).send('Error registering user');
          }
          console.log('User registered successfully');
          return res.status(200).json({ message: 'User registered successfully' });
      });
  });
});

// Register a new user
router.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    const query = "INSERT INTO register (username, password, email) VALUES (?, ?, ?)";
    connection.query(query, [username, password, email], (err) => {
      if (err) {
        console.error('Error registering user: ', err);
        return res.status(500).send('Error registering user');
      } else {
        console.log('User registered successfully');
        return res.status(200).send('User registered successfully');
      }
    });
  });
  router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT username FROM register WHERE email = ? AND password = ?";
    connection.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error logging in: ', err);
            return res.status(500).send('Error logging in');
        } else if (results.length > 0) {
            console.log('Login successful');
            return res.status(200).json({ message: 'Login successful', username: results[0].username });
        } else {
            return res.status(401).send('Incorrect email or password');
        }
    });
})

module.exports = router;