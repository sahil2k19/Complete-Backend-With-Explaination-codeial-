
# Building Codeial From Scratch
#### We create a very well folder structure so that everyone can find any file easily
#
# Scalable MVC structure
```
Directory -> Express -> Git -> Routers & Controllers -> view Engine
Partial & Layouts -> Static files -> MongoDB
```















## Settings up Directory Structure

Create file

    index.js

Now write below code 
    
    npm init
then fill the form and click ok 

#### Now next step Keeping our 'controller' , 'routers', and 'views' separate
    config
    controllers
    models
    routes
    views
    index.js
    package.json

## Starting Express 
    const express = require('express');
    const app =  express();
    const port = 8000;

    app.listen(port, function(err){
        if(err){
            console.log('error:', err);
        }
        console.log('server is running on port ' , port);
    })
#### We can also use 
    npx nodemon index.js 
#### To run server one-time
#### after that it update automatic after every save occurs
#
## Adding Git and NPM Starting
creating ```.gitignore```\
file  to ignore `node_modules` file\
so that this file not include when we write `git add .`\
Inside `.gitignore` file we write\
    `node_modules/`
#


## Setup the Express Routes 
So u can assume that a `Route` can handle direct url like 
```
/home
/about
/contact
```
Let us suppose if user want to go through some url like 
```
/users/
/users/profile/
/users/create/
```
Here we can see the `users` is the common then we handled it using `routes`\
we create `routes` like `user.js` which handle all these type of urls.
```
    ------------------------FOR EXAMPLE---------------------
main->index.js->
        app.use('/',require('/routes') );

routes->index.js -> 
                router.use('/users',require('./users'));
                    user.js->
                        -> router.get('/', userController.users);
                        -> router.get('/profile', userController.profile));
                        -> router.get('/create', userconteroller.create);
```
#### Create Routes Folder
##### Inside that Create a File `index.js` 
`index.js` is our entry point for all URL routes\
whenver we enter `routes` we always get in `index.js`\
and further it goes to different URL's.
```
routes-> index.js -> user.js
                  -> likes.js
                  -> post.js

```
#
### Inside routes->index.js
```
const express = require('express');
const router = express.Router(); 

module.export = router; // exporting router

```
if you see clearly in both index.js file we import `require('express')`\
this is just a instance of earlier used `require('express')`\


Now we need to tell `main-> index.js-> app` to use it.

#### Using express routers
```
main->index.js  

------------using middleware------------------
app.use('/', require('./routes/index'));


 ----------------we can also do ---------------------
const router = require('./routes/index');
app.use('/',router);

```
`app.use` is a middleware -> which access all mentions before server starts\
`require('./routes/index')` is import statement which we can use earlier like we import `express`
#
#
## Creating Controllers
Create a folder main->`controller`\
Inside that create a file `home_controller.js`

which looks like:-\
`main-> controller-> home_controller.js`
```
inside-> home_controller.js->

module.exports.home = function(req,res){  
    return res.end(('<h1>Express is up for codiel </h1>'));
}

----------------for refrence--------------------

module.exports.fucntionName = function(req,res){
    return --------------
}

```
In  `module.exports.home` of above code here `home` is function name\
Now we need to access this `home`(function) on routes
```
routes->index.js->

const homeController = require('../controllers/home_controller')

router.get('/',homeController.home); // we use home(function) 


```
Now if we run server , now the routing is working for `localhost:8000`

### Creating Another Controller 
Create new file in `controller` folder name it` users_controller.js`
`users_controller` will controller all the users when we use mongoDB

```
in users_controller.js ->

module.exports.profile = function(req,res){
    return res.end('<h1> user profile</h1>');
}

```
Now we need to create `routes` for this.\
Everytime we create `controller` we have to create `routes` for that.

Now we need to create file in `routes` name `usesr.js`\
which looks like `routes->usesr.js` 
```
Inside users.js->

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/profile', userController.profile);

module.exports = router;

```
Now we need to tell `main-> index.js` to use this `route`

If we go to `main->index.js` there we get access of `routes->index.js`which is another route \
So now we use this `routes (users.js)` in `routes->index.js`
```
inside routes->index.js->
router.use('/users', require('./users'));

------------for refrence----------------

router.use('/routerName', require('./routerFile'));

```
## Installing EJS and Setting up View Engine 
Run the command in Terminal `npm install ejs`

Now we need to tell `main->index.js` that we are using EJS as our View Engine
```
inside main->index.js->

app.set('view engine', 'ejs');
app.set('views', './views');


```
### Create a View for Home

Now for that create a file `home.ejs` inside `views` folder

```
<html>
    <head>
        <title>
            <%= title %>
        </title>
    </head>
    <body>
        <h1>
            codiel / <%= title%>
        </h1>
    </body>
</html>

```
Now we have to render this\
we now go to controller -> `home_controller`
```
Inside controllers-> home_controller->

module.exports.home = function(req,res){
    return res.render('home' ,{
        title : 'home', 
    });
}

```
#
#


# Partials in Views

#### Partials are views that are designed to be used from within other views.

But in our case we need to create partials for header and footer.\
So that we `dont have to copy whole code again and again`.


### Partials are created in `Views` folder 
So we need to create 2 partials for that:-\
## `_header.ejs`
## `_footer.ejs`
We add `(_)underscore` as a naming convention.\
Just to differetiate it with other views.

```
inside views-> _footer.ejs

<footer>
    Page footer
</footer>

------------------------------------------------------

inside views-> _header.ejs

<header>
    Page header
</header>

```
It will not automatic add to the ejs->other file\
we need to mention that where to use.

### For that we use :-
### `<%-include ('_header'); %>` 
### `<%-include ('_footer'); %>` 

We just replace these code with whole code of header and footer
#
#
# Creating Layouts 
#### This Embedded JavaScript file acts as the default layout for all server side views rendered by your app.

We need to use a library : `Express-ejs-layouts`

For that we need to install that using command `npm install express-ejs-layouts`\
After that create a file in `views.ejs` -> `layout.ejs`

### In `main-> index.js` 
```
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
```

### In `views-> layout.ejs`
```
<body>
    <!------------ this is partial------------------->
    <%- include ('_header') %>


        <%- body %>

            <!-- this is partial -->
            <%- include('_footer') %>
                <%- script %>
</body>

```
On above code `<%- body %>` is variable part of body which changes dynamically\
After that we can remove all the code of other ejs file as our `Layouts` is set \
So our code will look like this :-

```
views-> home.ejs

<h1>
    Codiel / <%= title%>
</h1>


```
Yes just like above code nothing else 

#
#
#
## Setting Up Static File access
Create folder -> `assets`\
Here we create ->\
-> `css(folder)`-> `style.css`  \
-> `script` folder\
-> 
```
main-> index.js
----------------------------------------

app.use(exress.static('./assets'));



views-> layout.ejs-> 
----------------------------------------
<link rel="stylesheet" href ="/css/layout.css">
```
On above `layout.ejs` code we just simply mention the css file ,\
as we mention the whole path in `index.js`
#
#

## Linking our MongoDb
First of all we need to install mongoose

`npm install mongoose `

create a file under `config`folder name `mongoose.js`

```
main-> index.js->
------------------------------------
const db = require('./config/mongoose')


config-> mongoose.js->
-------------------------------


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting MongoDb"));

db.once('open', function(){
    console.log('connected to database :: MongoDb')
});
module.exports = db;
```
#
#
# Manual Authentication :-

#### POST-> Verify Identity-> Store Identity Token In  Browser(Using Cookies)

#### -> Serve User Specific Data-> Delete Token on Sign out

## Step 1:- Creating User
For that we need to create `user.js` in `models` folder\
And inside that we need to create a `SCHEMA`
```
const mongoose  = require('mongoose');

const userSchema  = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,

    },
    name:{
        type:String,
        required:true, 
    }

}, {
    timesstamps:true,
});

const User = mongoose.model('User' ,userSchema);

module.exports =User;

```
In `userSchema` we create key-value pair to define property\
and inside the `email` property we define another property(as we need email to be `unique`)\
Here in Schema there are 2 field 
#### `const userSchema = new mongoose.Schema({property}, {timesstamps}); `
Now we need to tell what would be the name of collection(model) of this schema\
whenever we create model name or collection name we should always uppercase first letter(naming convenction)\
`const User = mongoose.model('User', userSchema);`\
here `User` is the name of collection(model) of this Schema.
#
#
## Step 2:- Rendering pages for Sign_Up and Sign_In

For rendering these pages we have to create 2 views in `views` folder
#### -> `user_sign_in.ejs` and `user_sign_up.ejs`
To render these pages we need to have some **`controllers`** 

Now in controller we need to add couple of actions `controllers/users_controller`.
```
-----------------render the singUp page-----------------------

module.exports.signUp = function(res, req){
    return res.render('user_sign_up', {
        title:"codeial | signUp
    })
}

----------------render the singIn page-------------------------

module.exports.signIn = function(res, req){
    return res.render('user_sign_In', {
        title:"codeial | signIn",
    })
}

```
Now we need routes 

```
routes-> user.js-> 

router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);


```
#
#
## Step 3:- Creating Form for Sign_In and Sign_Up
```
views-> user-sign-in.ejs-> 

<form action="/users/create-session" method="POST">

    <input type="email" name='email' placeholder="your email" required>
    <input type="password" name='password' placeholder="your password" required>

    <input type="submit" value="Sign In">
</form>
-------------------------------------------------------------
views-> user-sign-up.ejs->

<form action="/users/create" method="POST">
    <input type="text" name='name' placeholder="YOUR Name" required>
    <input type="email" name='email' placeholder="your email" required>
    <input type="password" name='password' placeholder="your password" required>
    <input type="password" name='confirm_password' placeholder="confirm password" required>
    <input type="submit" value="Sign Up">
</form>
```

### Now in `controller`-> `users_controller` :-
```
//render sign-up page
module.exports.signUp = function (req, res) {
    return res.render('user-sign-up', {
        title: "codeial | signUp",
    })
}


//render sign-in page 
module.exports.signIn = function (req, res) {
    return res.render('user-sign-in', {
        title: "codeial | signIn",
    })
}

//get the sign-up data
module.exports.create = function (req, res) {
    //todo later
}
 
// sign in and create session for the user
module.exports.createSession = function(req,res){
    //todo later
}


```
#
#
## Step 4:- Creating and Altering a Cookie
Reading writing to a cookie we use a library cookie parser

```
npm install cookie-parser

```
```
main-> index.js

const cookieParser = require('cookie-parser');  
```
Now we tell the app to use it.\
We tell it in middleware.
```
app.use(express.urlencoded({extended:false })); //reading through post request

app.use(cookieParser()); // setting cookie parser

```
In `home_controller` 
```
module.export.home = function(req,res){
    console.log(req.cookie); //print cookie
    res.cookie('user_id',25); //Manually changing the value
}
```

#
### Authentication steps 
```
1. Create User (Sign-In)
2. Create Session(Sign-Up)
3. Show Details Of Signed In User on Profile Page
4. Sign-OUt
```
### Creating User:-
In `users_controller`
```
const User = require('../models/user');




// get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('error in finding user in signing up'); return }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('error in creating user while signing up'); return }

                return res.redirect('/users/sign-in');
            })
        } else {
            return res.redirect('back');
        }

    });

}
```
If you see 'user-sign-up.ejs` in `form -> action` we use `/user/create-session`

so we need to match router for that.

In `routes-> user.js`
```
router.get('/create', userController.create);

```
#







# Authentication using Passport:-
Passport.js is a middleware which authenticates user requests.\
When authentication succeeds a session for the signed-in user is established, and the next function in the stack is called.\
This next function is typically application-specific logic which will process the request.

## Installing Passport
``` 
npm install passport
npm install passport-local
```
#### `config-> passport-local-strategy.js`
```
const passport  = require('passport');
const localStrategy = require('passport-local').Strategy;
```
we need to tell Passport that we will use passport-local-strategy

```
config-> passport-local-strategy.js->

// import user
const User = require('../models/user')


// authentication using passport

passport.use(new localStrategy({
    usernameField:'email', // we make email unique
    },
    function(email,password, done){ //callback function 

        //find user and establish a identity

        User.findOne({email:'email'},function(err,user){

            // if error
            if(err){ 
                console.log('Error in finding -> Passport.js');
                return done( err); 
            }

            // no error but user not found 
            if(!user || user.password != password){
                console.log('Invalid username/password');
                return done(null, false);
            }

            // if user found 
            return done(null, user);
        });
    }
));

// serializing the user to decide which key is to be kept in the Cookies

passport.serializeUser(function(user,done){
    done(null, user.id); // store userId encrypted format
})


// deserializing the user from the key in the cookies  

passport.deserializeUser(function(id,done){

    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding user --> Passport');
            return done(err);
        }
        return done(null,user);
    });
});

//exporting
module.exports = passport; 

```

#
#
## Express sessions and Passport for Authentication

We need to install `express-session`
``` 
npm install express-session 

```
Now we use `express-session`

```
main->index.js->

// used for session cookies

const session = require('express-session');
const passport  = require('passport');
const passportLocal = require('./config/passport-local-strategy')

```
Now we need to add a middleware which takes session cookies and `encrypt` that.\
We add it after the `view Engine` setup.

```
// tell app to use 'session'

app.use(session({
    name:'codeial',
    //todo change the secret before deployment in production mode
    secret:'blahsomething',
    saveUninitialized: false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100),
    }
}))

// tell app to use 'passport'
    //put this before routes-> or you may get error
app.use(passport.initialize());
app.use(passport.session());
```
Now in `controllers`->`users_controller`
```
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

```
Now in `routes`-> `user`

```
const passport = require('passport');




// use passport as a middleware to authenticate 
    //router link should matches to the sign-in form(action) 
    
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},

) , userController.createSession );

```
# 
### Sending Data of Sign-in Current User to the views:-
In `config-> passport-local-strategy`
```

// check if the user is authenticated------------------------------------------------

passport.checkAuthentication = function (req, res, next) {
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()) {
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}
----------------------------------------------------------------------------------

// set the users for the views -
// this is middleware to check the user sign-in or not

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    // if we not write next() -> it will stuck on same page 
    next();
}

module.exports = passport;

```
Now we update our routes with authentication

```
router.get('/profile', passport.checkAuthentication, usersController.profile);

```
now we also setup current user usage

`main->index.js`

```
app.use(passport.initialize());
app.use(passport.session());

// write the below line after that

// if will check weather the session cookie is being present or not 

app.use(passport.setAuthenticatedUser); 
```
Note:- what `setAuthenticatedUser` does is making current `req.user` to `req.locals.user`

### Passing user data to Views and Limits

`views->Profile.ejs`

```
<link rel="stylesheet" href="/css/user_profile.css">
<h1>
    Codeial / Profile Page
</h1>

<p>
    <%= user.name %>
</p>
<p>
    <%= user.email %>
</p>

```
Now making `sign-up` and `sign-in` pages only when user is `SIGN-OUT`

```
// render the sign up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

```
Now here is one Problem, whenever we restart our server our `session-cookie` expires

Now we to counter that Problem
### Setting up Mongo store for session cookies
`npm i connect-mongo`

`Main-> index.js`

```
const MongoStore = require('connect-mongo');




// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/codeial_development',
            mongooseConnection: db,
            autoRemove: 'disabled'

        },
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
   
}));

```
So After doing that our Session is permanantely store
#
### Creating Sign-Out

In `views-> _header.ejs`

```
<header id="layout-header">
    <nav>
        <div class="mini-logo">
            <p>
                <a href='/'>
                    codeial
                </a>
            </p>
        </div>

        <div class="auth-links">
            <ul>
                <% if (locals.user){ %>
                    <li>
                        <a href="/users/profile">
                            <%= user.name %>
                        </a>
                    </li>
                    <li>
                        <a href="/users/sign-out">Sign Out</a>
                    </li>
                    <% }else{ %>
                        <li>
                            <a href="/users/sign-in">Sign In</a>
                        </li>
                        <li>
                            <a href="/users/sign-up">Sign Up</a>
                        </li>

                        <% } %>
            </ul>
        </div>
    </nav>



</header>

```
Now in `routes-> user.js`

```
router.get('/sign-out', usersController.destroySession);

```


Now in `controllers-> users_controller`

```
module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log(err, 'error');
        }
        return res.redirect('/');

    });
}

```

### We now use SASS in our project

`npm i node-sass-middleware`

`main->index.js`
```
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

```



\.
## Database Relations (Post and Comments)

### Creating Schemas for Posts `models/posts.js`
```
const mongoose  = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
    }
    user:{
        type:mongoose.Schemas.Types.ObjectId,
        ref:'User',
    }
},{
    timestamps:true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post; 

```
#### Now we create form in `views/home.ejs`
```
<section id="feed-posts">
    <h4>Posts</h4>    
        <form action="/posts/create" id="new-post-form" method="POST">
            <textarea name="content" cols="30" rows="3" placeholder="Type Here..." required></textarea>
            <input type="submit" value="Post">
        </form>
</section>
```
#
### Saving Post to the Database
Now create `post_controller.js` in `controllers`

```

const Post = require('../models/post');
module.exports.create = function(req,res){
    Post.create({
        content:req.body.content, // this (content) is take from the (form)
        user:req.user._id,
    },function(err,post){
        if(err){
            console.log('error in creating post')
            return ;
        }
        return res.redirect('back');
    })
}
```
Now create routes `routs-> user.js`

```
const express = require('express');
const router = express.Router();

const postController = require('../controllers/posts_controller');

// this is the exact action('posts/create') of POST method in form
router.post('/create', postsController.create); 

module.exports = router;

```
Now in `index.js`
```
router.user('/posts', require('/posts'));
```
### Display Post and Ralated User

In `home_controller`

```
module.exports.home = function(req,res){
    // we populate user from all the posts
    Post.find({}).populate('user').exec(function(err, posts){
        return res.render('home', {
            title:"codeial ,
            posts:posts,
        })
    })
}

```
We have fetched all the post with Authors(users.name).\
Now we have to display that.



```
 <div id="posts-list-container">
                <ul>
                    <% for(post of posts){ %>

                        <li>
                            <p>
                                <!-- <% if (locals.user && locals.user.id==locals.user.id) { %> -->

                                <small>
                                    <a href="/posts/destroy/<%= post.id %> ">X</a>
                                </small>
                                <!-- <% } %> -->
                                <%= post.content %>
                                    <br>
                                    <small>
                                        <%= post.user.name %>
                                    </small>
                            </p>
                        </li>
                </ul>
</div>
```


#
#
## Mongoose Model.Populate( ) (refrence only)

### Step 1: Make your schemas
You need a schema for each collection. One for the users, and one for the posts those users are going to make.
```
const UserSchema = new mongoose.Schema({
    username: String,
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }]
  })
const PostSchema = new mongoose.Schema({
    content: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  })
const Post = mongoose.model('Post', PostSchema, 'posts');
  const User = mongoose.model('User', UserSchema, 'users');
module.exports = {
    User, Post,
  }

```
The properties that we want to use .populate() on are properties that have a type of mongoose.Schema.Types.ObjectId. This tells Mongoose “Hey, I’m gonna be referencing other documents from other collections”. The next part of that property is the ref. The ref tells Mongoose “Those docs are going to be in the ___ collection.”

### Step 2: Correctly Creating Users And Posts

After linking other collections in your schema using the appropriate type and ref, your actual stored data for that property will be another document’s _id. It will be stored as a string. This also works for an array of _ids.

#### So while your schema says this:

```
const UserSchema = new mongoose.Schema({
    username: String,
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }]
  })

```
#### Your actual stored property should read something like this:
```
{
  _id: 59ab1c92ea84486fb4ba9f28,
  username: JD,
  posts: [
    "59ab1b43ea84486fb4ba9ef0",
    "59ab1b43ea84486fb4ba9ef1"
  ]
}

```
Keep in mind that this is your stored document. We have not called .populate() on it yet. Once it is called, it will go to the appropriate collection, search for those two _ids, and return your user, but now with an array of her actual posts. Let’s do that now.

### Step 3: Implementing .Populate()

Here’s the function:
```
function getUserWithPosts(username){
  return User.findOne({ username: username })
    .populate('posts').exec((err, posts) => {
      console.log("Populated User " + posts);
    })
}
```
.populate() needs a query to attach itself to, so we are using User.findOne() to find a user who matches the username we provide in the argument. 


Calling .exec() just executes something once .populate() has done it’s thing. The log prints this:
```
{ 
  _id: 59ab1c92ea84486fb4ba9f28,
  username: 'JD',
  posts:
    [ 
      { 
        _id: 59ab1b43ea84486fb4ba9ef0,
        content: "Is it dark out?"
      },{
        _id: 59ab1b43ea84486fb4ba9ef1,
        content: "Hey anyone got a cup of sugar?"
      }
    ]
  }

```

And like magic, we have created a unified object using 2 schemas, 2 models, and 2 collections. 
#


### Check Authentication on Creating Post

```js
<link rel="stylesheet" href="/css/home.css">

<div id="home-container">
    <section id="feed-posts">
        <h4>Posts</h4>
        <% if(locals.user){ %> <---add this-----
            <form action="/posts/create" id="new-post-form" method="POST">
                <textarea name="content" cols="30" rows="3" placeholder="Type Here..." required></textarea>
                <input type="submit" value="Post">
            </form>
            <% } %>                
    </section>   
</div>

<script src="/js/home_posts.js"></script>

```
Now we have to put check on `route level`\
so that `Outsider` cannot explicitly goes to form action by knowing URL\
We do this so that `OUtsider` cannot create its own html and submit the form to required action

So in `routes/post.js`
```js
const passport = require('passport');


router.post('/create', passport.checkAuthentication, postsController.create);

```
#
### Creating Schema for comments

create `models/comment.js`


```js
const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    content:{
        type:string,
        required:true,
    },
    //comment belongs to user 
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
    }
},{timestamps:true})

Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment

```
So instead of going to each `Comments` we can freaquently fetch that as the query\
By adding the `Comment-collection(model)` inside the `Post` 

In `models/post`
```js
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },

    ------------------------edited--------------------
    // include the array of ids of all comments in this post schema itself
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
    ---------------------end edit---------------------
}, {
    timestamps: true
});
```

### Adding comments to the DB

So in `home.ejs`
```js
<div class="post-comments">
    <% if (locals.user){ %>
        <form action="/comments/create" method="POST">
            <input type="text" name="content" placeholder="Type Here to add comment..."
                required>
            <input type="hidden" name="post" value="<%= post._id %>">
            <input type="submit" value="Add Comment">
        </form>

        <% } %>
</div>

```
Now we create `comments_controller` in `controllers`

```js
const Comment = require('models/comment');
const passport = require('passport');
const Post = require('modes/post');

module.exports.create = function (req, res) {
    Post.findById(req.body.post, function (err, post) {

        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function (err, comment) {
                // handle error

                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }

    });
}

---------------------try-catch() method ---------------------
module.exports.create = async function(req,res){
    let post = await Post.findById(req.body.post);
    try{        
        if(post){
            let comment = await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id,
            })
            post.comments.push(comment);
            post.save();
            res.redirect('/');
        }
    }
    catch(err){
        console.log('error in creating post',err);
        res.redirect('/');
    }

}

```
Now we have to create `Routes` for that 

create `routes/comments.js`

```js
const express = require('express');

const router = express.Router();

const passport = require('passport');

const commentsController = require('../controllers/comments_controller');

router.post('/create', passport.checkAuthentication, commentsController.create);

router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroy);


module.exports = router;

```



\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
.
