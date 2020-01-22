let express = require('express');
let app = express();

let staticMiddleware = express.static('public');

app.use(staticMiddleware);

app.use(express.urlencoded({extended:true}));

////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////

app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), () => {
    console.log("Server listening on ", app.get('port'))
})