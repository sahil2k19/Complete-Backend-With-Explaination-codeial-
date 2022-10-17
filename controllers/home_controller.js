const Post = require('../models/post');

const User = require('../models/user');


// module.exports.home = function (req, res) {
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // });
    // console.log('here we go');
    // populate the user of each post
    // console.log(Post.find({}).populate('user'))

    //before
    // Post.find({}).populate('user').exec(function (err, posts) 

    //after -> to show the comments of users
    // Post.find({}).populate('').populate({'' : '' , populate:{'':'' } } )

    // Post.find({}).populate('user').exec(function (err, posts) { console.log(posts.user) }) -- fixing in stackoverflow


module.exports.home = async function (req, res) {
    try{
        let posts = await Post.find({})
        .sort('-createdAt') // this is basically a timeStamps 
        // we sort according to it ->>Remember this is how data strored in mongodb(timestabms)
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        
        let users = await User.find({});

        return res.render('home',{
            title:"codeial|home",
            posts:posts,
            all_users:users,
        })
    }
    catch(err){
        console.log('error', err);
        return;
    }


}

// module.exports.actionName = function(req, res){}