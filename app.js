const express = require('express');
let app = express();
const axios = require('axios');

app.set('port', process.env.PORT || 3002);

// Handle form submissions
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// Handle JSON in the body
app.use(require('body-parser').json());

app.get('/', function(req, res) {
    axios.post('http://localhost:3000/purchase', {
    item: 'Hotdog',
    quantity: '3'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  res.status(200).send("post successful");
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
    res.status(404);
    res.json({
        "status" : "error",
        "message" : "This page can not be found."
    });
  });

  // 500 error handler (middleware)
app.use(function(error, req, res, next){
    console.error(error.stack);
    res.status(500);
    res.json({
        "status" : "error",
        "message" : "An internal error has occurred."
    });
  });
  
  app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
      app.get('port') + '; press Ctrl-C to terminate.' );
  });