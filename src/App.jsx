import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import MyNavBar from "./component/navbar/MyNavBar";
import MyHome from "./component/home/MyHome";
import MyRegister from "./component/auth/MyRegister";

import LoginPage from "./component/access/LoginPage";

import AccessPage from "./component/access/AccessPage";
import Dashboard from "./component/dashboard/Dashboard";
import DashboardUser from "./component/dashboardUser/DashboardUser";
import DashboardFatture from "./component/dashboardUser/DashboardFatture";
import MyProfile from "./component/profilo/MyProfile";
import ListaClienti from "./component/clienti/ListaClienti";
import ProfiloCliente from "./component/clienti/ProfiloCliente";
import FattureCliente from "./component/dashboardUser/FattureCliente";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavBar />
        <Routes>
          <Route path="/" element={<MyHome />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<AccessPage />} />
          <Route path="/access" element={<AccessPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboardUser" element={<DashboardUser />} />
          <Route path="/dashboardFatture" element={<DashboardFatture />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/dashboardClienti" element={<ListaClienti />} />
          <Route path="/paginaProfilo/:id" element={<ProfiloCliente />} />
          <Route path="/fatture/:id" element={<FattureCliente />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
