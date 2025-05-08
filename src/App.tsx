import { RouterProvider } from "react-router-dom";
import browserRouter from "./router/router";
import { Box } from "@mui/material";

function App() {
  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <RouterProvider router={browserRouter}></RouterProvider>
    </Box>
  );
}

export default App;
