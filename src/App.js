import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./Layout/Layout";
import { ForgotPassword } from "./Pages/ForgotPassword/ForgotPassword";
import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login/Login";
import { Registration } from "./Pages/Registration";
import LoggedIn from "./PrivateRouter/LoggedIn";
import NotLoggedIn from "./PrivateRouter/NotLoggedIn";
import { Message } from "./Pages/Message";
import { Notification } from "./Components/Notifications";
import AccountInfo from "./Components/AccountInfo";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<LoggedIn />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/message" element={<Message />}></Route>
            <Route path="/notification" element={<Notification />}></Route>
            <Route path="/account" element={<AccountInfo />}></Route>
          </Route>
        </Route>
        <Route element={<NotLoggedIn />}>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgotpass" element={<ForgotPassword />}></Route>
        </Route>
      </Route>
    )
  );
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
