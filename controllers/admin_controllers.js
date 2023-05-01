const {PrismaClient}= require("@prisma/client");
 const express = require("express")
const prisma = new PrismaClient;
async function createUser(req,res){
    const {name,age,likes,subcount} = req.body;
    const newUser = await prisma.user.create({data:{
        name: name,
        age: age,
        likes: likes,
        subcount: subcount
    }})
    return res.status(200).json("user created")

}
async function updateUser(req,res){
    const id = parseInt(req.params.id)
    const{name,age,likes,subcount} = req.body;
    const data = await prisma.user.findUnique({where:{id: id}})
    if (!data){ return res.status(500).json({err: "User not found"})}
    const updateUser = await prisma.user.update({where:{id: id},
    data:{
        name: name,
        age: age,
        likes: likes,
        subcount: subcount
    }})
    return res.status(200).json(updateUser)
}

async function getUser(req,res){
    const id = parseInt(req.params.id)
    const data = await prisma.user.findUnique({where:{id: id}})
    if(!data){return res.status(500).json({err:"no such user"})}
    return res.status(200).json(data)
}

async function deleteUser(req,res){
    const id = parseInt(req.params.id)
    await prisma.user.delete({where:{id}})
    return res.status(200).json("user deleted")
}

async function findAllUsers(req,res){
    const data = await prisma.user.findMany()
    return res.status(200).json(data)
}
module.exports={
    createUser,
    updateUser,
    getUser,
    deleteUser,
    findAllUsers
}