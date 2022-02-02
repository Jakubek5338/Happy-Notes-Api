const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRouter = require('./src/routes/auth');
const noteRouter = require('./src/routes/note');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/user', authRouter);
app.use('/api/note', noteRouter);


dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true});

const port = process.env.PORT

app.listen(port, function () {
    console.log(`App listening at http://localhost:${port}`);
})