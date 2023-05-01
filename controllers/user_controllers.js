const { PrismaClient } = require("@prisma/client");
const express = require("express");
const prisma = new PrismaClient();

async function CreatePost(req, res) {
  const { id, title, video } = req.body;
  const newPost = await prisma.post.create({
    data: {
      title: title,
      video: video,
      User: {
        connect: {
          id: id,
        },
      },
    },
  });
  return res.status(200).json("video posted");
}
async function AddComment(req, res) {
  const { id, postId, message } = req.body;
  const newComment = await prisma.comments.create({
    data: { id: id, postId: postId, message: message },
  });
  return res.status(200).json("comment posted");
}

async function updatePost(req, res) {
  const { title, video } = req.body;
  const postId = parseInt(req.params.postId);
  const data = await prisma.post.findUnique({ where: { postId: postId } });
  if (!data) {
    return res.status(500).json("video dnb, hmne hatadi");
  }
  const updatedPost = await prisma.post.update({
    where: { postId: postId },
    data: {
      title: title,
      video: video,
    },
  });
  return res.status(200).json("Post updated");
}

async function updateComment(req, res) {
  const commentId = parseInt(req.params.commentId);
  const { id, postId, message } = req.body;
  const data = await prisma.comments.findUnique({
    where: { commentId: commentId },
  });
  if (!data) {
    return res.status(500).json("comment dnb hmne hatadi");
  }
  const newComment = await prisma.comments.update({
    where: { commentId: commentId },
    data: {
      id: id,
      postId: postId,
      message: message,
    },
  });
  return res.status(200).json("comment updated");
}

async function seePost(req, res) {
  const { title } = req.body;
  const data = await prisma.post.findMany({ where: { title: title } });
  return res.status(200).json(data);
}

async function readComment(req, res) {
  const commentId = parseInt(req.params.commentId);
  const data = await prisma.comments.findUnique({
    where: { commentId: commentId },
  });
  if (!data) {
    return res.status(500).json("no such comment");
  }
  return res.status(200).json(data);
}

async function deletePost(req, res) {
  const postId = parseInt(req.params.postId);
  const data = await prisma.post.findUnique({ where: { postId: postId } });
  if (!data) {
    res.status(500).json("video dne");
  }
  await prisma.post.delete({ where: { postId: postId } });
  res.status(200).json("post deleted");
}

async function deleteComment(req, res) {
  const commentId = parseInt(req.params.commentId);
  const data = await prisma.comments.findUnique({
    where: { commentId: commentId },
  });
  if (!data) {
    res.status(500).json("no such comment");
  }
  await prisma.comments.delete({ where: { commentId: commentId } });
  res.status(200).json("comment deleted");
}

module.exports = {
  CreatePost,
  AddComment,
  seePost,
  readComment,
  updatePost,
  updateComment,
  deletePost,
  deleteComment,
};
