let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let port = 3000;

let mongoose = require('mongoose');
let assert = require('assert');
let morgan = require('morgan');
let fs = require('fs')
let path = require('path')
var rfs = require('rotating-file-stream')


let versionString = '0.1.2@2.8.19';

mongoose.Promise = require('bluebird');

// Configuring the database
let dbConfig = require('./config/db-config.js');
// create express app

let app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
// parse application/json
app.use(bodyParser.json())


let logDirectory = path.join(__dirname, 'logs')
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
// create a rotating write stream
let accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
})

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

mongoose.connect(dbConfig.url, {
    //useMongoClient: true
    useNewUrlParser: true
});

mongoose.connection.on('error', function () {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function () {
    console.log("Successfully connected to the database");
})

// define a simple route
app.get('/', function (req, res) {
    res.json({
        "message": "Welcome to triple stores on mongo",
        "version": versionString
    });
});

require('./app/routes/tstore-routes.js')(app);
require('./app/routes/thread-routes.js')(app);
require('./app/routes/correlator-routes.js')(app);
require('./app/routes/metadata-routes.js')(app);

// listen for requests
app.listen(port, function () {
    console.log("Triple Store Server is listening on port ", port, " ver ", versionString);
});
