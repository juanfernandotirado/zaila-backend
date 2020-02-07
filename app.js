let express = require('express');
let app = express();
bodyParser = require("body-parser");

app.use(bodyParser.json());

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
    res.status(error.status).render('error', { error: error });
}

app.use(errorHandler);

////////////////////////////////////////////////////////////

app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), () => {
    console.log("Server listening on ", app.get('port'))
})