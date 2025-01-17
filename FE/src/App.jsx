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
import { DashboardDosen } from "./modules/dashboard/dashboard-dosen";
import { NavbarDosen } from "./templates/navbar-dosen";
import { DosenClasses } from "./modules/classes/dosen/dosen-classes";
import { DosenDetailClasses } from "./modules/classes/dosen/dosen-detail-class";
import { DosenClassesMeet } from "./modules/classes/dosen/dosen-meet";
import { NavbarSekdos } from "./templates/navbar-sekdos";
import Mahasiswa from "./modules/sekdos/mahasiswa/mahasiswa";
import DetailMahasiswa from "./modules/sekdos/mahasiswa/detail-mahasiswa";
import DetailKelasMahasiswa from "./modules/sekdos/mahasiswa/detail-kelas-mahasiswa";
import DosenRegistration from "./modules/sekdos/register-dosen/dosen-registration";

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

          {/* Dosen */}
          <Route path="/dosen/" element={<NavbarDosen component={DashboardDosen} />} />
          <Route path="/dosen/kelas" element={<NavbarDosen component={DosenClasses} />} />
          <Route path="/dosen/kelas/:id" element={<NavbarDosen component={DosenDetailClasses} />} />
          <Route path="/dosen/kelas/:id/:idp" element={<NavbarDosen component={DosenClassesMeet} />} />
          <Route path="/dosen/profile" element={<NavbarDosen component={Profile} />} />

          {/* Sekdos */}
          <Route path="/sekdos/" element={<NavbarSekdos component={Mahasiswa} />} />
          <Route path="/sekdos/mahasiswa/:id" element={<NavbarSekdos component={DetailMahasiswa} />} />
          <Route path="/sekdos/mahasiswa/:id/:class_id" element={<NavbarSekdos component={DetailKelasMahasiswa} />} />
          <Route path="/sekdos/registration" element={<NavbarSekdos component={DosenRegistration} />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="colored" />
    </>
  );
}
