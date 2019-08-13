const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt-nodejs')
const morgan = require('morgan');

const deleteArticle = require('./Controllers/deletearticle')
const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const articlepost = require('./Controllers/articlepost');
const articlesfetch = require('./Controllers/articlesfetch');
const articlelike = require('./Controllers/articlelike');
const editarticle = require('./Controllers/editarticle');
const reportarticle = require('./Controllers/reportarticle');
const signout = require('./Controllers/signout');
const auth = require('./Controllers/authorization');

const db = knex({ 
	client:'pg',
	connection: process.env.POSTGRES_URI
})

const whitelist = ['http://localhost:3001']
const corsOptions = {
	origin: function (origin, callback) {
	    if (whitelist.indexOf(origin) !== -1) {
	      callback(null, true)
	    } else {
	      callback(new Error('Not allowed by CORS'))
	    }
	}
}

app.use(cors(corsOptions));
const app = express();
app.use(bodyParser.json());
app.use(morgan('combined'));

app.get('/', (req,res) => {res.send("it's working now")});

app.get('/articles', (req,res) => { articlesfetch.handleArticlesfetch(req,res,db)});

// sigin in, out and register routes

app.post('/signin', (req,res) => {signin.signinAuthentication(db,bcrypt, req,res)});

app.delete('/signout', auth.requireAuth, (req,res) => {signout.signOutAuthentication(req,res)});

app.post('/register', auth.requireAuth, (req,res) => {register.handleRegister(req,res,db,bcrypt)});

// article routes

app.delete('/delete', auth.requireAuth, (req,res) => {deleteArticle.handleDelete(req,res,db)});

app.put('/editarticle', auth.requireAuth, (req,res) => {editarticle.handleArticleedit(req,res,db)});

app.put('/update', (req,res) => {articlelike.handleArticlelike(req,res,db)});

app.post('/post', (req,res) => {articlepost.handleArticlepost(req,res,db)});

app.post('/report', (req,res) => { reportarticle.handleReportarticle(req,res,nodemailer)});


app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT || 3000}`)
})

