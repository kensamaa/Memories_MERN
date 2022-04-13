import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import { LogInfo } from "../helpers/logs.js";
export const getPosts = async (req, res) => {
  try {
    LogInfo("Start get Posts");
    const postMessages = await PostMessage.find();
    LogInfo(postMessages);
    res.status(200).json(postMessages);
    LogInfo("End get Posts");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  LogInfo("Start create Posts");
  const post = req.body;
  LogInfo("request body " + post);
  const newPostMessage = new PostMessage(post);
  try {
    await newPostMessage.save();
    LogInfo("End create Posts");
    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const updatePost = async (req, res) => {
  LogInfo("Start update Posts");
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  LogInfo("request param " + id);
  //test if id is valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
  LogInfo("End update Posts");
  res.json(updatedPost);
};
export const deletePost = async (req, res) => {
  LogInfo("Start delete Post");

  try {
    const { id } = req.params;
    //test if id is valid
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
    await PostMessage.findByIdAndRemove(id);
    LogInfo("End delete Post");
    res.json({ message: "post deleted success" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const likePost = async (req, res) => {
  LogInfo("Start like Post");

  try {
    const { id } = req.params;
    //test if id is valid
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
    //get the post to like
    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );

    LogInfo("End like Post");
    res.json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
