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
const path = require('path')

// Express App

const app=express()
const db = process.env.DATABASE
const port = process.env.PORT
app.use('/', express.static(path.join(__dirname, 'public')))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

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
    res.setHeader("Access-Control-Allow-Origin", "https://localhost:3001");
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
		origin: "https://localhost:3001",
		methods: "GET,POST,PUT,DELETE",
		credentials: true
	})
);

//connecting to MongoDB

mongoose.connect(db)
    .then(()=>{
        app.listen(port, ()=> {
            console.log('connection to mongoDB has been established successfully on port ', port)
        })
    })
    .catch((error) => {
        console.log(error)
    })
