const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
	var now = new Date().toString();	
	var log = `${now}: ${req.method} ${req.url}`
	console.log(log);
	fs.appendFile('server.log', log + '\r\n');
	next();	
});

/* app.use((req,res,next) => {
	res.render("maint.hbs");
}); */

hbs.registerHelper('getCurrentyear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
}); 

app.get('/',(req, res) => {
	res.render("home.hbs",{
		pageTitle: 'Home Page',
		welcomeMessage: 'hello a Hans' 
	});
});

app.get("/about", (req,res) => {
	res.render("about.hbs",{
		pageTitle: 'About Page',		
		welcomeMessage: 'hello a Hans'
	});
});

app.get("/bad", (req,res) => {
	res.send({
		status: 'NotFound',
		code: 404,
		type: ["red","orange","blue"]
	})
});

app.listen(3000);