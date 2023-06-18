const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors");
require('dotenv').config()
const messageRoutes = require('./routes/messageRoutes')
const practiceRoutes = require('./routes/practiceRoutes')
const passport = require("passport");
const authRoute = require("./routes/auth");
const session = require('express-session')
const passportStrategy = require("./passport");
const cookieSession = require("cookie-session");
const userRoutes = require('./routes/userRoutes')
const allPracticeRoutes = require('./routes/allPracticeRoutes')
const Practice = require('./models/practiceModel')
const clientsRoutes = require('./routes/clientsRoutes')
const allClientsRoutes = require('./routes/allClientsRoutes')
const allBlogRoutes = require('./routes/allBlogRoutes')
const blogRoutes = require('./routes/blogRoutes')
const commentRoutes = require('./routes/commentRoutes')
const bodyParser = require('body-parser');

// Express App

const app=express()
const db = process.env.DATABASE
const port = process.env.PORT
app.set('env', process.env.NODE_ENV || 'development');
app.use(express.static('public'));

//Middleware

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);
 app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://rcdso-frontend.vercel.app");
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.use(passport.initialize());
app.use(passport.session());

//Routes

app.use('/api/messages' , messageRoutes)
app.use("/auth", authRoute);
app.use('/api/user', userRoutes)
app.use('/api/practices', practiceRoutes)
app.use('/api/allpractices', allPracticeRoutes)
app.use('/api/allclients', allClientsRoutes)
app.use('/api/clients', clientsRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/allblogs', allBlogRoutes)
app.use('/api/comments', commentRoutes)

app.use(
	cors({
		origin: "https://rcdso-frontend.vercel.app",
		methods: "GET,POST,PUT,DELETE",
		credentials: true
	})
);

//connecting to MongoDB

mongoose.connect(db)
    .then(()=>{
        app.listen(https://rcdso-backend.onrender.com/, ()=> {
            console.log('connection to mongoDB has been established successfully on port ', port)
        })
    })
    .catch((error) => {
        console.log(error)
    })
