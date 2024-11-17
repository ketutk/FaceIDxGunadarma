import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Register } from "./modules/register/register";
import { Login } from "./modules/login/login";
import "react-toastify/dist/ReactToastify.css";
import { DashboardMahasiswa } from "./modules/dashboard/dashboard-mahasiswa";
import { NavbarMahasiswa } from "./templates/navbar-mahasiswa";
import { initFlowbite } from "flowbite";
import { NotFound } from "./modules/forbiddern/notfound";
import { Profile } from "./modules/profile/profile";
import { MahasiswaClasses } from "./modules/classes/mahasiswa/mahasiswa-classes";
import { MahasiswaDetailClasses } from "./modules/classes/mahasiswa/mahasiswa-detail-class";

export default function App() {
  initFlowbite();
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Global */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Mahasiswa */}
          <Route path="/mahasiswa/" element={<NavbarMahasiswa component={DashboardMahasiswa} />} />
          <Route path="/mahasiswa/profile" element={<NavbarMahasiswa component={Profile} />} />
          <Route path="/mahasiswa/kelas" element={<NavbarMahasiswa component={MahasiswaClasses} />} />
          <Route path="/mahasiswa/kelas/:id" element={<NavbarMahasiswa component={MahasiswaDetailClasses} />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="colored" />
    </>
  );
}
