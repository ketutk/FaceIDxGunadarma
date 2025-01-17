import React, { useEffect, useState } from "react";
import { FaceModal } from "./face-modal";
import { fetchProfile, fetchRegister } from "../../API/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    identity: "",
    password: "",
    phone: "",
  });
  const [face, setFace] = useState();
  const [modelIsLoaded, setModelsLoaded] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const redirect = async () => {
      try {
        const response = await fetchProfile(token);
        navigate(`/${response.data.data.role}/`);
      } catch (e) {
        console.log(e);
        if (e.response.status === 401) {
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    };
    if (token) {
      redirect();
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!face) return toast.error("Data wajah perlu diisi");

    setIsLoading(true);
    formData.face = face;

    try {
      const response = await fetchRegister(formData);
      toast.success(response.data.message);
      clearData();
    } catch (e) {
      if (typeof e.response.data.message != "string") {
        Object.values(e.response.data.message).forEach((e) => {
          toast.error(e);
        });
      } else {
        toast.error(e.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  function clearData() {
    setFormData({
      name: "",
      identity: "",
      password: "",
      phone: "",
    });
    setFace();
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="basis-1/2 md:flex hidden bg-gradient-to-br from-purple-700 to-purple-900 flex-col items-center justify-center gap-y-10">
        <h1 className="text-white text-5xl font-bold">FaceID</h1>
        <h1 className="text-white text-4xl font-bold">Welcome to Registration</h1>
      </div>

      {/* Right Section - Form */}
      <div className="basis-full md:basis-1/2 bg-white flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-8">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">Daftar</h2>

          <div className="mb-4">
            <label className="block text-gray-700">Nama</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required disabled={isLoading} />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">NPM</label>
            <input type="text" name="identity" value={formData.identity} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required disabled={isLoading} />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required disabled={isLoading} />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Telepon</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required disabled={isLoading} />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Data Wajah</label>
            {face ? <p className="my-4 text-green-600">Data wajah telah disimpan</p> : <p className="text-red-700 my-3">Belum ada data wajah.</p>}
            <FaceModal modelsLoaded={modelIsLoaded} setFaceDescriptor={setFace} disabled={isLoading} />
          </div>

          <button
            type="submit"
            className={`w-full bg-purple-700 text-white p-2 rounded hover:bg-purple-800 transition-colors
              ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Mendaftar..." : "Daftar sebagai Mahasiswa"}
          </button>

          <hr className="my-3 border border-purple-500 border-y-2" />

          <Link to={"/login"}>
            <button type="button" className="w-full mt-3 outline outline-purple-700 text-black p-2 rounded hover:bg-purple-800 hover:text-white" disabled={isLoading}>
              Login Jika Memiliki Akun
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};
