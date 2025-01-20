import React, { useEffect, useState } from "react";
import { fetchLogin, fetchProfile } from "../../API/auth";
import { Link, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import faceid from "../../assets/faceid.png";
import logo from "../../assets/logo.png";
import welcome from "../../assets/welcome.png";

export const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    identity: "",
    password: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const redirect = async () => {
      try {
        const response = await fetchProfile(token);
        navigate(`/${response.data.data.role}/`);
      } catch (e) {
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
    setIsLoading(true);
    try {
      const response = await fetchLogin(formData);
      toast.success(response.data.message);
      clearData();
      localStorage.setItem("token", response.data.data.token);
      return navigate(`/${response.data.data.role}/`);
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
      identity: "",
      password: "",
    });
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="basis-1/2 md:flex hidden bg-gradient-to-br from-purple-700 to-purple-900 flex-col items-center justify-center gap-y-4">
        <img src={faceid} alt="Logo faceid" className="w-80 object-cover" />
        <h1 className="text-white text-4xl font-bold">Gunadarma's College Project</h1>
        <img src={logo} alt="Logo gunadarma" className="w-80 object-cover opacity-40" />
      </div>

      {/* Right Section - Form */}
      <div className="basis-full md:basis-1/2 bg-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold text-purple-700 mb-6">Welcome to</h2>
        <Link to={"/"}>
          <img src={welcome} alt="Logo faceid" className="w-80 object-cover md:hidden" />
        </Link>

        <form onSubmit={handleSubmit} className="w-full max-w-md p-8">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">Login</h2>

          <div className="mb-4">
            <label className="block text-gray-700">NPM/NIP/No.ID</label>
            <input type="text" name="identity" value={formData.identity} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required disabled={isLoading} />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required disabled={isLoading} />
          </div>

          <button type="submit" className="w-full bg-purple-700 text-white p-2 rounded hover:bg-purple-800 disabled:bg-purple-400 disabled:cursor-not-allowed" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>
          <hr className="my-3 border border-purple-500 border-y-2" />
          <Link to={"/register"}>
            <button
              type="button"
              className="w-full mt-3 outline outline-purple-700 text-black p-2 rounded hover:bg-purple-800 hover:text-white disabled:bg-gray-200 disabled:cursor-not-allowed disabled:outline-gray-400 disabled:text-gray-600"
              disabled={isLoading}
            >
              Daftar Khusus Mahasiswa
            </button>
          </Link>
          <Link to={"/"}>
            <button
              type="button"
              className="w-full mt-3 outline outline-purple-700 text-black p-2 rounded hover:bg-purple-800 hover:text-white disabled:bg-gray-200 disabled:cursor-not-allowed disabled:outline-gray-400 disabled:text-gray-600"
              disabled={isLoading}
            >
              Kembali ke Home
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};
