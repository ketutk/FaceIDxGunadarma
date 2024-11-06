import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Register } from "./modules/register/register";
import { Login } from "./modules/login/login";
import "react-toastify/dist/ReactToastify.css";
import { DashboardMahasiswa } from "./modules/dashboard/dashboard-mahasiswa";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Global */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Mahasiswa */}
          <Route path="/mahasiswa/" element={<DashboardMahasiswa />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="colored" />
    </>
  );
}
