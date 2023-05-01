const express = require("express")

const AdRouter = express.Router()
const {getUser,updateUser,createUser,deleteUser,findAllUsers} = require("../controllers/admin_controllers")

AdRouter.get('/find/:id', getUser)
AdRouter.put('/update/:id',updateUser)
AdRouter.post('/post',createUser)
AdRouter.delete('/delete/:id',deleteUser)
AdRouter.get('/all',findAllUsers)











module.exports = AdRouter