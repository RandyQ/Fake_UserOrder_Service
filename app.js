const express = require('express');
let app = express();
const axios = require('axios');

app.set('port', process.env.PORT || 3002);

// Handle form submissions
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// Handle JSON in the body
app.use(require('body-parser').json());

app.get('/start', function (req, res) {
    setInterval(() => axios.post('http://ordering/purchase', {
        item: 'Hotdog',
        quantity: '10'
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        }), 2000);
    res.status(200).send("Fake Ordering Service has been initiated...");
});

function test() {

    return 0;
}

// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
    res.status(404);
    res.json({
        "status": "error",
        "message": "This page can not be found."
    });
});

// 500 error handler (middleware)
app.use(function (error, req, res, next) {
    console.error(error.stack);
    res.status(500);
    res.json({
        "status": "error",
        "message": "An internal error has occurred."
    });
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
});