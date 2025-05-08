import { Box, Button, Chip, Stack, TextField, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ArticleIcon from "@mui/icons-material/Article";
import SchoolIcon from "@mui/icons-material/School";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useRef, useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type TMsgState = {
  text: string;
  user: User;
};

enum User {
  "AI",
  "AnonymousUser",
}
const Chat = () => {
  const [msgState, setMsgState] = useState<Array<TMsgState>>();
  const InputRef = useRef<null | HTMLInputElement>(null);
  const [userInput, setUserInput] = useState<string>("");

  const handSendPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (InputRef && userInput) {
      setMsgState(() => {
        if (!msgState && userInput) {
          return [{ text: userInput, user: User.AnonymousUser }];
        }
        if (msgState && userInput) {
          return [...msgState, { text: userInput, user: User.AnonymousUser }];
        }
      });
    }

    try {
      const res = await axios.post("http://127.0.0.1:8002/talk", {
        text: userInput,
      });

      setMsgState((prev) => {
        if (prev) {
          return [...prev, { text: res.data, user: User.AI }];
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  console.log(msgState);
  return (
    <Box sx={{ bgcolor: "#242423" }}>
      <Box
        sx={{
          width: "100%",
          height: "80px",

          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: "13%",
            height: "100%",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DriveFileRenameOutlineIcon
            sx={{ mr: "30px", color: "#E8EDDF", fontSize: "20px" }}
          />
          <Button
            sx={{
              bgcolor: "#484847",
              color: "#E8EDDF",
              height: "40px",
              width: "120px",
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "900",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}> Edge </Typography>
            <KeyboardArrowDownIcon />{" "}
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "93vh",

          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!msgState && (
          <Typography
            fontSize={"36px"}
            sx={{ size: "100px", color: "#E8EDDF" }}
          >
            What can I help with?
          </Typography>
        )}

        {msgState && (
          <Box
            sx={{
              width: "70%",
              height: "800px",
              overflowY: "auto",
            }}
          >
            {msgState &&
              msgState.map((item, idx) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent:
                        item.user == User.AI ? "flex-start" : "flex-end",
                    }}
                    key={idx}
                  >
                    <Box
                      sx={{
                        height: "auto",
                        bgcolor: item.user === User.AI ? "" : "#5A5E5A",
                        color: "white",
                        p: "12px",
                        margin: "12px",
                        borderRadius: "20px",
                        maxWidth: "400px",
                        minWidth: "100px",
                      }}
                    >
                      {/* <Typography sx={{ fontSize: "16px" }}>
                      {item.text}
                    </Typography> */}
                      <Typography sx={{ fontSize: "18px" }}>
                        <Markdown
                          remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                        >
                          {item.text}
                        </Markdown>
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
          </Box>
        )}
        <Box
          sx={{
            padding: "12px",
            border: "0.5px solid #464946",
            borderRadius: "30px",
            bgcolor: "#333533",
            mt: "20px",
          }}
        >
          <form onSubmit={handSendPrompt}>
            <TextField
              id="outlined-multiline-flexible"
              label="Ask Anything"
              //   multiline
              onChange={(e) => setUserInput(e.target.value)}
              maxRows={4}
              ref={InputRef}
              sx={{
                width: "600px",
                bgcolor: "#333533",
                border: "none",
                outline: "none",
                color: "#E8EDDF",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                },
              }}
              fullWidth
              placeholder="Ask Anything"
            />
          </form>
        </Box>

        <Box sx={{ mt: "20px" }}>
          <Stack direction="row" spacing={1}>
            <Chip
              sx={{ color: "#E8EDDF", bgcolor: "#464946" }}
              label="Brainstorm"
              // onClick={handleClick}
              // onDelete={handleDelete}
              icon={<PsychologyIcon />}
            />
            <Chip
              sx={{ color: "#E8EDDF", bgcolor: "#464946" }}
              label="Summarize text"
              //   onClick={handleClick}
              //   onDelete={handleDelete}
              icon={<ArticleIcon sx={{}} />}
              variant="outlined"
            />

            <Chip
              sx={{ color: "#E8EDDF", bgcolor: "#464946" }}
              label="Get Advice"
              //   onClick={handleClick}
              //   onDelete={handleDelete}
              icon={<SchoolIcon />}
              variant="outlined"
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
