var express = require( 'express' );
var jade = require( 'jade' );
var fs = require( 'fs' );
var less = require( 'less' );
var app = express();

app.get( '/', function( req, res ) {
  var html = jade.renderFile( 'views/home.jade' );
  res.setHeader( 'Content-Type', 'text/html' );
  res.end( html );
} ).get( '/:page', function( req, res ) {
  var html = jade.renderFile( 'views/' + req.params.page + '.jade', {
    name: req.params.page
  }, function( err, html ) {
    if ( err ) return jade.renderFile( 'views/404.jade' );
    else return html;
  } );
  res.setHeader( 'Content-Type', 'text/html' );
  res.charset = 'utf-8';
  res.end( html );
} ).get( '/projects/:project', function( req, res ) {
  var html = jade.renderFile( 'views/projects/' + req.params.project + '.jade', {
    name: req.params.project
  }, function( err, html ) {
    if ( err ) return jade.renderFile( 'views/404.jade' );
    else return html;
  } );
  res.setHeader( 'Content-Type', 'text/html' );
  res.charset = 'utf-8';
  res.end( html );
} ).get( '/experiments/:experience', function( req, res ) {
  var html = jade.renderFile( 'views/experiments/' + req.params.experience + '.jade', {
    name: req.params.experience
  }, function( err, html ) {
    if ( err ) return jade.renderFile( 'views/404.jade' );
    else return html;
  } );
  res.setHeader( 'Content-Type', 'text/html' );
  res.charset = 'utf-8';
  res.end( html );
} ).use( "/", express.static( __dirname ) );

app.listen( 8080 );