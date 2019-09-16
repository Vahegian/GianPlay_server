// const fs = require('fs');
// const userFile = '././privateConsts.json';
// let userData = JSON.parse(fs.readFileSync(userFile, 'utf-8'));
const exp = require('express');
const server = exp();
var GianProvider = require('./server/gianProvider.js');
var GianServer = require('./server/restServer.js');
// var Caster = require('./server/caster.js');
var gp = new GianProvider();
var gs = new GianServer(server, gp);
// var cast = new Caster();

// cast.connect_to_device();
// cast.cast("10.0.0.34:7646/GIO/22");

gs.start_server(exp);
// gs.open_cast_server_links(cast);
// gs.update_api_links();
// gs.prepare_lib()

// var WebSocket = require('ws');
// var nodecast = require('nodecast');
// var stream = nodecast.find();

// stream.on('device', function(device) {
// 	console.log('Found device', device.name);

// 	var youtube = device.app('YouTube');

// 	youtube.start('v=oHg5SJYRHA0', function(err) {
// 		if (err) console.log('error starting', err);
// 		console.log('Started on', device.name);
// 	});
// });