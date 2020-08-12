const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_DEV !== 'production'; //true false
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler(); //part of next config
const compression = require('compression');
const crypto = require('crypto');

nextApp.prepare().then(() => {
    const app = express();
    app.use(compression({ filter: shouldCompress }));
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        if (!dev && req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(['https://', req.get('Host'), req.url].join(''));
        }
        return next();
    });
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/static", express.static(__dirname + "/static", {
        maxAge: "365d"
    }));


    app.get('/sudoku', (req, res, next) => {
        if (!req.query.gameSeed) {
            const gameSeed = crypto.randomBytes(4).toString('hex');
            const difficulty = req.query.difficulty || 70;

            res.redirect(`sudoku?gameSeed=${gameSeed}&difficulty=${difficulty}&dev=${dev}`);
        }
        next();
    });

    app.get('*', (req,res) => {
        return handle(req,res); // for all the react stuff
    });

    app.listen(PORT, err => {
        if (err) throw err;
        console.log(`ready at http://localhost:${PORT}`)
    });
        
    function shouldCompress (req, res) {
        if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
        }
    
        // fallback to standard filter function
        return compression.filter(req, res)
    }
});