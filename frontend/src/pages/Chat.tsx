import React, { useState } from "react";
import { Box, Avatar, Typography, Button } from "@mui/material";
import red from "@mui/material/colors/red";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";

// type Message = {
//   content: string;
//   role: "user" | "assistant";
// };

const chatMessages = [
  {
      "role": "user",
      "content": "Hi there! Can you help me with some math problems?"
  },
  {
      "role": "assistant",
      "content": "Of course! I'd be happy to help. What specific math problems do you need assistance with?"
  },
  {
      "role": "user",
      "content": "I'm having trouble understanding calculus concepts, especially limits."
  },
  {
      "role": "assistant",
      "content": "Calculus can be tricky, but I'll do my best to explain. Let's start with the concept of limits. A limit is the value that a function approaches as the input approaches a certain value. For example, if we have the function f(x) = (x^2 - 1)/(x - 1), the limit of f(x) as x approaches 1 is 2. Do you follow so far?"
  },
  {
      "role": "user",
      "content": "Yes, that makes sense. Thank you for the explanation!"
  },
  {
      "role": "assistant",
      "content": "You're welcome! Feel free to ask if you have any more questions or if there's anything else I can help you with."
  }
]

const Chat = () => {
  const auth = useAuth();
  // const [chatMessages] = useState<Message[]>([]);



  return (

    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
      <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
            <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
            >
              {auth?.user?.name[0]}
              {auth?.user?.name.split("")[1][0]}
            </Avatar>
            <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a ChatBOT
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask some questions related to GEC college. But avoid sharing personal information
          </Typography>
          <Button
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat,index) => (
          // <div>{chat.content}</div>
          <ChatItem content={chat.content} role={chat.role} key={index} />

          ))}
        </Box>

      

      </Box>
    </Box>
  );
};

export default Chat;
