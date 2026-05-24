const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { MongoMemoryServer } = require('mongodb-memory-server');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const path = require('path');

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

// DB
async function connectDB() {
  let MONGO = process.env.MONGO_URI;
  if (!MONGO) {
    const mongod = await MongoMemoryServer.create();
    MONGO = mongod.getUri();
    console.log('Using in-memory MongoDB for user-service');
  }
  mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('User DB connected'))
    .catch(err => console.error('User DB error', err));
}
connectDB();

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// serve static playground for quick testing
app.use(express.static(path.join(__dirname, 'public')));
app.get('/playground', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'playground.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`User service running on ${PORT}`));
