var express  = require('express');
var jade     = require('jade');
var fs       = require('fs');
var less     = require('less');
var app      = express();

app.get('/', function(req, res) {
  var html = jade.renderFile('views/home.jade');
  res.setHeader('Content-Type', 'text/html');
  res.end(html);
}).get('/:page', function(req, res) {
  var html = jade.renderFile('views/' + req.params.page + '.jade', function (err, html) {
    if (err) return jade.renderFile('views/404.jade');
    else return html;
  });
  res.setHeader('Content-Type', 'text/html');
  res.charset = 'utf-8';
  res.end(html);
}).get('/projects/:project', function(req, res) {
  var html = jade.renderFile('views/projects/' + req.params.project + '.jade', function (err, html) {
    if (err)return jade.renderFile('views/404.jade');
    else return html;
  });
  res.setHeader('Content-Type', 'text/html');
  res.charset = 'utf-8';
  res.end(html);
}).get('/experiments/:experience', function(req, res) {
  var html = jade.renderFile('views/experiments/' + req.params.experience + '.jade', function (err, html) {
    if (err){
      console.log(err);
      return jade.renderFile('views/404.jade');
    }
    else return html;
  });
  res.setHeader('Content-Type', 'text/html');
  res.charset = 'utf-8';
  res.end(html);
}).use("/", express.static(__dirname));

app.listen(process.env.PORT || 3000);