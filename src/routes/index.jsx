import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import PixMenuPage from "../pages/PixMenuPage";
import PixQRCodePage from "../pages/PixQRCodePage";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Agrupar rotas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/menu" element={<PixMenuPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pix" element={<PixQRCodePage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
