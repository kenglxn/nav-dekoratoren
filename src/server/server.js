const express = require('express');
const app = express();
const PORT = 8080;

const isProduction = process.env.NODE_ENV === 'production';

const allowedOrigin = isProduction
    ? `(http|https)://(.*).nav.no`
    : `http://localhost:8080`;

app.use((req, res, next) => {
    const origin = req.get('origin');
    if (origin && origin.match(allowedOrigin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
    }
    next();
});

app.use('/person/nav-dekoratoren/', express.static('build/'));

app.get('/person/nav-dekoratoren/isAlive', (req, res) => res.sendStatus(200));
app.get('/person/nav-dekoratoren/isReady', (req, res) => res.sendStatus(200));
app.get('/person/nav-dekoratoren/', (req, res) => res.sendStatus(200));

app.listen(PORT, () => console.log(`App listening on port: 8080`));
