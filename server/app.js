const config = require('./utils/config');
const {setup} = require('./api/route');

let swaggerInline = require('swagger-inline');
let express = require('express');
let bodyParser = require('body-parser');
var swaggerUi = require('swagger-ui-express');

let app = express();

app.state = {};
app.state.config = config;
//middleware helps make the body of the request into JSON
app.use(bodyParser.json());

swaggerInline(['server/api/*.js'], {
    base: 'server/swaggerbase.yaml',
    format: '.json',
}).then((generatedSwagger) => {
  console.log(generatedSwagger);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(generatedSwagger));
});
const routes =  setup();
app.use(routes);

app.listen(config.get('port'), () => {
  console.log(`Started from port ${config.get('port')}`);
});

module.exports = {app};
