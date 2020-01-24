let express = require('express');
let app = express();
bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(express.urlencoded({extended:true}));

////////////////////////////////////////////////////////////

const { routerIndex } = require('./routes/index.js')
app.use('/api', routerIndex)

////////////////////////////////////////////////////////////

app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), () => {
    console.log("Server listening on ", app.get('port'))
})