const express = require("express")
const Router = express.Router()
const {seePost,readComment,CreatePost,AddComment,updatePost,updateComment,deleteComment,deletePost} = require("../controllers/user_controllers")

Router.get('/post',seePost)
Router.get('/comment',readComment)

Router.post('/post',CreatePost)
Router.post('/comment',AddComment)

Router.put('/post',updatePost)
Router.put('/comment',updateComment)

Router.delete('/post',deletePost)
Router.delete('/comment',deleteComment)

module.exports = Router