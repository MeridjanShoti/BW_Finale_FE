import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import MyNavBar from "./component/navbar/MyNavBar";
import MyHome from "./component/home/MyHome";
import MyRegister from "./component/auth/MyRegister";

import LoginPage from "./component/access/LoginPage";
import MyLogin from "./component/auth/MyLogin";
import AccessPage from "./component/access/AccessPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavBar />
        <Routes>
         
          <Route path="/" element={<MyHome />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<MyRegister />} />
          <Route path="/access" element={<AccessPage />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
