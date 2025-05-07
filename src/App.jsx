import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import MyNavBar from "./component/navbar/MyNavBar";
import MyHome from "./component/home/MyHome";
import MyRegister from "./component/auth/MyRegister";

import LoginPage from "./component/access/LoginPage";

import AccessPage from "./component/access/AccessPage";
import Dashboard from "./component/dashboard/Dashboard";

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
          <Route path="/dashboard" element={<Dashboard />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
