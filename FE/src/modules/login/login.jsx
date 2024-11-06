// RegisterPage.jsx
import React, { useEffect, useState } from "react";
import { fetchLogin } from "../../API/auth";
import { Link, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identity: "",
    password: "",
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
    try {
      const response = await fetchLogin(formData);
      toast.success(response.data.message);
      clearData();
      setTimeout(() => {
        localStorage.setItem("token", response.data.data.token);
        return navigate(`/${response.data.data.role}/`);
      }, 1500);
    } catch (e) {
      if (typeof e.response.data.message != "string") {
        Object.values(e.response.data.message).forEach((e) => {
          toast.error(e);
        });
      } else {
        toast.error(e.response.data.message);
      }
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
      <div className="basis-1/2 md:flex hidden bg-gradient-to-br from-purple-700 to-purple-900 flex-col items-center justify-center gap-y-10">
        <h1 className="text-white text-5xl font-bold">FaceID</h1>
        <h1 className="text-white text-4xl font-bold">Welcome to Login</h1>
      </div>

      {/* Right Section - Form */}
      <div className="basis-full md:basis-1/2 bg-white flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-8">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">Login</h2>

          <div className="mb-4">
            <label className="block text-gray-700">NPM/NIP/No.ID</label>
            <input type="text" name="identity" value={formData.identity} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
          </div>

          <button type="submit" className="w-full bg-purple-700 text-white p-2 rounded hover:bg-purple-800">
            Login
          </button>
          <hr className="my-3 border border-purple-500 border-y-2" />
          <Link to={"/register"}>
            <button type="button" className="w-full mt-3 outline outline-purple-700 text-black p-2 rounded hover:bg-purple-800 hover:text-white">
              Daftar Khusus Mahasiswa
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};
