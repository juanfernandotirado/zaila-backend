let express = require('express');
let app = express();
bodyParser = require("body-parser");
const cors = require('cors');

app.use(bodyParser.json());

app.use(cors());

app.use(express.urlencoded({extended:true}));
let conectionLog = ''


////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
    res.send(conectionLog)
});

////////////////////////////////////////////////////////////

const { routerIndex } = require('./routes/index.js')
app.use('/api', routerIndex)

////////////////////////////////////////////////////////////

app.get('*', (req, res, next) => {
    let error = new Error();
    error.status= 404;
    error.data = ['Error 404. Not found.'];
    next(error);
});

let errorHandler = (error, req, res, next) => {
    console.log(error);
    res.status((error.status != undefined ? error.status : "500"));
    res.send(error)
}

app.use(errorHandler);

////////////////////////////////////////////////////////////

app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), () => {
    console.log("Server listening on ", app.get('port'))
})