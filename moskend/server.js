var express = require('express');
var app = express();
var mongoose = require('mongoose');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

mongoose.connect('mongodb://moskdb/moskdb');

var rotaVisualizar = '/visualizar';
var Pagina = mongoose.model('Pagina', { titulo: String, conteudo: String });

app.get(rotaVisualizar, function (req, res) {
  var codigoPagina = req.query.id;

  Pagina.findOne({ _id: codigoPagina }, function (err, pagina) {
   res.render('index', pagina);
  });
});

app.post('/paginas', function(req, res){
  var pagina = req.body;

  var modeloPagina = new Pagina(pagina);
  modeloPagina.save(function (err, paginaSalva) {
    if (err) return res.status(500).send({ error: 'Something blew up!' });
    res.send(paginaSalva);
  });
});

app.use('/', express.static('front/recorte'));

app.set('view engine', 'ejs');
app.set('views', './front/recorte');

var server = app.listen(1337, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
