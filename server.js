// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'abcd',
  database: 'hall_booking'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected');
});

// Add hall
/* app.post('/api/addhall', (req, res) => {
  const { hallName, price, mobileNumber, address } = req.body;
  const checkHallQuery = 'SELECT * FROM hall WHERE hall_name = ?';
  const addHallQuery = 'INSERT INTO hall (hall_name, price, mobile_number, address) VALUES (?, ?, ?, ?)';

  db.query(checkHallQuery, [hallName], (err, results) => {
      if (err) {
          return res.status(500).send('Database query error');
      }
      if (results.length > 0) {
          return res.json({ success: false });
      }
      db.query(addHallQuery, [hallName, price, mobileNumber, address], (err, result) => {
          if (err) {
              return res.status(500).send('Database query error');
          }
          res.json({ success: true });
      });
  });
});

// Update hall
app.put('/api/hall/:id', (req, res) => {
  const { id } = req.params;
  const { hallName, price, mobileNumber, address } = req.body;
  const updateHallQuery = 'UPDATE hall SET hall_name = ?, price = ?, mobile_number = ?, address = ? WHERE hall_id = ?';

  db.query(updateHallQuery, [hallName, price, mobileNumber, address, id], (err, result) => {
      if (err) {
          return res.status(500).send('Database query error');
      }
      res.json({ success: true });
  });
});

// Delete hall
app.delete('/api/hall/:id', (req, res) => {
  const { id } = req.params;
  const deleteHallQuery = 'DELETE FROM hall WHERE hall_id = ?';

  db.query(deleteHallQuery, [id], (err, result) => {
      if (err) {
          return res.status(500).send('Database query error');
      }
      res.json({ success: true });
  });
});

// Get all halls
app.get('/api/halls', (req, res) => {
  const sql = 'SELECT * FROM hall';
  db.query(sql, (err, results) => {
      if (err) {
          return res.status(500).send('Database query error');
      }
      res.send(results);
  });
}); */
// Add hall
app.post('/api/addhall', upload.single('image'), (req, res) => {
  const { hallName, price, mobileNumber, address } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;
  const checkHallQuery = 'SELECT * FROM hall WHERE hall_name = ?';
  const addHallQuery = 'INSERT INTO hall (hall_name, price, mobile_number, address, image) VALUES (?, ?, ?, ?, ?)';

  db.query(checkHallQuery, [hallName], (err, results) => {
      if (err) {
          return res.status(500).send('Database query error');
      }
      if (results.length > 0) {
          return res.json({ success: false });
      }
      db.query(addHallQuery, [hallName, price, mobileNumber, address, image], (err, result) => {
          if (err) {
              return res.status(500).send('Database query error');
          }
          res.json({ success: true });
      });
  });
});

// Update hall
app.put('/api/hall/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { hallName, price, mobileNumber, address } = req.body;
  const image = req.file ? `uploads/${req.file.filename}` : null;
  const updateHallQuery = image
      ? 'UPDATE hall SET hall_name = ?, price = ?, mobile_number = ?, address = ?, image = ? WHERE hall_id = ?'
      : 'UPDATE hall SET hall_name = ?, price = ?, mobile_number = ?, address = ? WHERE hall_id = ?';

  const queryParams = image
      ? [hallName, price, mobileNumber, address, image, id]
      : [hallName, price, mobileNumber, address, id];

  db.query(updateHallQuery, queryParams, (err, result) => {
      if (err) {
          return res.status(500).send('Database query error');
      }
      res.json({ success: true });
  });
});

// Delete hall
app.delete('/api/hall/:id', (req, res) => {
  const { id } = req.params;
  const deleteHallQuery = 'DELETE FROM hall WHERE hall_id = ?';

  db.query(deleteHallQuery, [id], (err, result) => {
      if (err) {
          return res.status(500).send('Database query error');
      }
      res.json({ success: true });
  });
});

// Get all halls
app.get('/api/halls', (req, res) => {
  const sql = 'SELECT * FROM hall';
  db.query(sql, (err, results) => {
      if (err) {
          return res.status(500).send('Database query error');
      }
      res.send(results);
  });
});

app.get('/api/hallse', (req, res) => {
  const { date } = req.query;
  //console.log(date);
  const sql = `
      SELECT h.*, 
             CASE 
                 WHEN b.booking_date = ? THEN 1 
                 ELSE 0 
             END AS isBooked
      FROM hall h 
      LEFT JOIN booking b ON h.hall_id = b.hall_id ;
  `;
  db.query(sql, [date, date], (err, results) => {
      if (err) {
          return res.status(500).send('Database query error');
      }
      res.send(results);
  });
});

app.post('/api/bookhall', (req, res) => {
  const {
      hall_id, hallName, mobileNumber, address, price, bookingDate,
      upiTransId, upiAmountPaid, user_id, user_name, user_username, user_mobile
  } = req.body;

  const insertBookingQuery = `
      INSERT INTO booking (hall_id, hall_name, price, amount_paid, hall_address, hall_mobile, upi_trans_id, status, user_id, user_name, user_username, user_mobile, booking_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?)
  `;

  db.beginTransaction((err) => {
      if (err) return res.json({ success: false });

      db.query(insertBookingQuery, [hall_id, hallName, price, upiAmountPaid, address, mobileNumber, upiTransId, user_id, user_name, user_username, user_mobile, bookingDate], (err, result) => {
          if (err) {
              return db.rollback(() => {
                  res.json({ success: false });
              });
          }

          db.commit((err) => {
              if (err) {
                  return db.rollback(() => {
                      res.json({ success: false });
                  });
              }
              res.json({ success: true });
          });
      });
  });
});
app.get('/api/bookings', (req, res) => {
  const sql = 'SELECT * FROM booking';
  db.query(sql, (err, results) => {
      if (err) {
          return res.status(500).send('Database query error');
      }
      res.send(results);
  });
});

app.post('/api/user/login', (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const query = 'SELECT * FROM userregister WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'An error occurred', error: err });
    }

    if (results.length === 0 || results[0].password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user: results[0] });
  });
});

app.get('/api/check-username/:username', (req, res) => {
  const { username } = req.params;
  const query = 'SELECT * FROM userregister WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'An error occurred', error: err });
    }

    res.status(200).json({ exists: results.length > 0 });
  });
});

app.post('/api/user/register', (req, res) => {
  const { name, mobileNumber, address, username, password } = req.body;
  const checkQuery = 'SELECT * FROM userregister WHERE username = ?';
  db.query(checkQuery, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'An error occurred', error: err });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: 'Username already exists' });
    }
  const query = 'INSERT INTO userregister (name,mobile_number,address,username, password) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name,mobileNumber,address,username, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'An error occurred', error: err });
    }

    res.status(201).json({ message: 'User registered successfully' });
  });
});
});


app.listen(5000, () => {
  console.log('Server started on port 5000');
});