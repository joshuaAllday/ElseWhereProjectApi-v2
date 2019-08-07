const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt-nodejs')
const morgan = require('morgan');

const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const articlepost = require('./Controllers/articlepost');
const articlesfetch = require('./Controllers/articlesfetch');
const articlefetch = require('./Controllers/articlefetch');
const articlelike = require('./Controllers/articlelike');
const editarticle = require('./Controllers/editarticle');
const reportarticle = require('./Controllers/reportarticle');
const signout = require('./Controllers/signout');
const auth = require('./Controllers/authorization');

const db = knex({ 
	client:'pg',
	connection: process.env.POSTGRES_URI
})

const app = express();
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(cors());

app.get('/', (req,res) => {res.send("it's working now")});

app.get('/articles', (req,res) => { articlesfetch.handleArticlesfetch(req,res,db)});

app.get('/article/:id', (req,res) => { articlefetch.handleArticlefetch(req,res,db)});

app.put('/editarticle', (req,res) => {editarticle.handleArticleedit(req,res,db)});

app.put('/update', (req,res) => {articlelike.handleArticlelike(req,res,db)});

app.post('/post', (req,res) => {articlepost.handleArticlepost(req,res,db)});

app.post('/report', (req,res) => { reportarticle.handleReportarticle(req,res,nodemailer)});

// sigin in, out and register routes

app.post('/signin', (req,res) => {signin.signinAuthentication(db,bcrypt, req,res)});

app.delete('/signout', auth.requireAuth, (req,res) => {signout.signOutAuthentication(req,res)});

app.post('/register', auth.requireAuth, (req,res) => {register.handleRegister(req,res,db,bcrypt)});

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT || 3000}`)
})

