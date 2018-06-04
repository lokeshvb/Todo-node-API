// require('./config/config');
const config = require('./utils/config');
const {setup} = require('./api/route');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.state = {};
app.state.config = config;
//middleware helps make the body of the request into JSON
app.use(bodyParser.json());

const routes =  setup();
app.use(routes);

app.listen(config.get('port'), () => {
  console.log(`Started up at port ${config.get('port')}`);
});
