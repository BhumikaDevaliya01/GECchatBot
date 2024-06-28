import { NextFunction, Request, Response, response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import  {ChatCompletionRequestMessage}  from "openai";
import { OpenAIApi } from "openai";
import { error } from "console";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user){
      console.log("Error in generateChatCompletion usernot findById");
      return res
      .status(401)
      .json({ message: "User not registered OR Token malfunctioned" });
    }
    // grab chats of user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });
    console.log("In generateChatCompletion chat pushed sucessfully");
    
    // send all chats with new one to openAI API
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);
    console.log("send all chats with new one to openAPI");
    // get latest response
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    }).then(response=>console.log(response)).catch(error=>console.log("---------------------",error));
    console.log("In chatResponse Function");
    // user.chats.push(chatResponse.data.choices[0].message);
    // await user.save();
    console.log("In generateChatCompletion chatResponse pushed sucessfully");
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log("Error in generateChatCompletion",error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
