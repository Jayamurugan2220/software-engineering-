const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { MongoMemoryServer } = require('mongodb-memory-server');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

async function connectDB() {
  let MONGO = process.env.MONGO_URI;
  if (!MONGO) {
    const mongod = await MongoMemoryServer.create();
    MONGO = mongod.getUri();
    console.log('Using in-memory MongoDB for sprint-service');
  }
  mongoose.connect(MONGO).then(() => console.log('Sprint DB connected'))
    .catch(err => console.error(err));
}
connectDB();

app.use('/api/sprints', require('./routes/sprints'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Sprint service running on ${PORT}`));
