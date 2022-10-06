const Post = require('../models/post');

module.exports.home = function (req, res) {
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

    Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec(function (err, posts) {
            return res.render('home', {
                title: "Codeial | Home",
                posts: posts
            });
        })

}

// module.exports.actionName = function(req, res){}