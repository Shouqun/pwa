const https = require('https');
const express = require('express');
const fs = require('fs');
const servestatic = require('serve-static');
const path = require('path');

var options = {
  key: fs.readFileSync('cert/node.key'),
  cert: fs.readFileSync('cert/node.crt')
};

var app = express();
var document_root = path.dirname(__dirname)

app.use(servestatic(document_root, {'index': ['index.html']}));

var https_server = https.createServer(options, app);
https_server.listen(8088);

console.log('HTTPS Server Running on 8088, DocumentRoot: ' + document_root);
