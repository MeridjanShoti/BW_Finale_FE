import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import MyNavBar from "./component/navbar/MyNavBar";
import MyHome from "./component/home/MyHome";
import MyRegister from "./component/auth/MyRegister";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavBar />
        <Routes>
          <Route path="/" element={<MyHome />} />
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/register" element={<MyRegister />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
