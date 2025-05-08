import { createBrowserRouter } from "react-router-dom";
import Chat from "../pages/Chat";
const browserRouter = createBrowserRouter([
  {
    element: "",
    path: "/",
  },
  {
    path: "/chat",
    element: <Chat />,
  },
]);

export default browserRouter;
