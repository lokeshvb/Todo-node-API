const config = require('./utils/config');
const {setup} = require('./api/route');

let swaggerInline = require('swagger-inline');
let express = require('express');
let bodyParser = require('body-parser');
let swaggerUi = require('swagger-ui-express');
let YAML = require('yamljs');
let swaggerDocument = YAML.load('./swagger.yaml');
let app = express();

app.state = {};
app.state.config = config;
//middleware helps make the body of the request into JSON
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const routes =  setup();
app.use(routes);

app.listen(config.get('port'), () => {
  console.log(`Started from port ${config.get('port')}`);
});

module.exports = {app};
