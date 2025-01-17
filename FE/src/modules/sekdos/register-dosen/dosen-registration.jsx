import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchRegisterDosen } from "../../../API/auth";

const DosenRegistration = ({ user, token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    identity: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const clearData = () => {
    setFormData({
      name: "",
      identity: "",
      password: "",
      phone: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetchRegisterDosen(formData, token);
      toast.success(response.data.message);
      clearData();
    } catch (e) {
      if (typeof e.response.data.message !== "string") {
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

  return (
    <div className="flex justify-center">
      {/* Right Section - Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-purple-700 mb-6">Daftar Dosen</h2>

        <div className="mb-4">
          <label className="block text-gray-700">NIDN</label>
          <input type="text" name="identity" className="w-full p-2 border border-gray-300 rounded" value={formData.identity} onChange={handleChange} required disabled={isLoading} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Nama</label>
          <input type="text" name="name" className="w-full p-2 border border-gray-300 rounded" value={formData.name} onChange={handleChange} required disabled={isLoading} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Nomor Telepon</label>
          <input type="text" name="phone" className="w-full p-2 border border-gray-300 rounded" value={formData.phone} onChange={handleChange} required disabled={isLoading} />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input type="password" name="password" className="w-full p-2 border border-gray-300 rounded" value={formData.password} onChange={handleChange} required disabled={isLoading} />
        </div>

        <button
          type="submit"
          className={`w-full bg-purple-700 text-white p-2 rounded hover:bg-purple-800 transition-colors
            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? "Mendaftar..." : "Daftar sebagai Dosen"}
        </button>

        <hr className="my-3 border border-purple-500 border-y-2" />
      </form>
    </div>
  );
};

export default DosenRegistration;
