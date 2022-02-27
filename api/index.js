const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const { Hello, Bye, User, Post, Auth } = require('./routes');
const port = process.env.PORT || 8080;

mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const app = express();
        app.use(cors());
        app.use(bodyParser.json());

        app.use('/api', Hello);
        app.use('/api/bye', Bye);
        app.use('/api/users', User);
        app.use('/api/posts', Post);
        app.use('/api/auth', Auth);
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

    }).catch((error) => {
        console.log(error);
    })

