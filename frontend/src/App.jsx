import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/Userlogin";
import UserSignup from "./pages/UserSignup";
import CaptionLogin from "./pages/CaptionLogin";
import CaptainSignup from "./pages/CaptainSignup";
import UserProctectWrapper from "./pages/UserProctectWrapper";
import UserLogout from "./pages/UserLogout";
import Home from "./pages/Home";
import CaptainHome from "./pages/CaptainHome";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route
          path="/home"
          element={
            <UserProctectWrapper>
              <Home />
            </UserProctectWrapper>
          }
        />
        <Route
          path="/logout"
          element={
            <UserProctectWrapper>
              <UserLogout />
            </UserProctectWrapper>
          }
        />

        <Route path="/captain-login" element={<CaptionLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/captain-home" element={<CaptainHome />} />
      </Routes>
    </div>
  );
}

export default App;
