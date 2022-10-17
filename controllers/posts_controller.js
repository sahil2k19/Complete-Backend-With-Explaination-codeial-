const Post = require('../models/post')
const Comment = require('../models/comment')
module.exports.create = async function (req, res) {
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                massage:"post created"
            })
        }
            
        return res.redirect('back');
    }
    catch(err){
        return res.redirect('back');
    }
    
}

// module.exports.destroy = function (req, res) {
//     Post.findById(req.params.id, function (err, post) {
//         // .id means converting the object id into string
//         if (post.user == req.user.id) {
//             post.remove();

//             Comment.deleteMany({ post: req.params.id }, function (err) {
//                 return res.redirect('back');
//             });

//         } else {
//             return res.redirect('back');
//         }
//     });
// }

module.exports.destroy = async function (req, res) {
    console.log('hi->>>' + req.user.id + "->>>" + req.params.id)
    try{
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        if (post.user == req.user.id) {
            console.log(post.user, '  ', req.user.id);

            post.remove();
            Comment.deleteMany({ post: req.params.id });

            // console.log(req.params.id);
            return res.redirect('back');
        }

        else {
            console.log('not get inside the delete');
            console.log(post.user, '  ', req.user.id);
            return res.redirect('back');
        }
    }   
    catch(err){
        console.log('error in deleting post');
        return res.redirect('back');
    } 
};
