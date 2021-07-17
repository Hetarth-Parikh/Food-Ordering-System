const express = require('express');
const app = express();
const cookiesParser = require('cookie-parser');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const PORT = process.env.PORT || 4000;

require('./db/conn');

app.use(express.json());
app.use(cookiesParser());
app.use(require('./router/auth'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../build/index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});