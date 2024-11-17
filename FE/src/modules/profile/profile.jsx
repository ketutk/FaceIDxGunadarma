import { useState } from "react";
import { toast } from "react-toastify";
import { fetchChangePassword } from "../../API/auth";

export const Profile = ({ user, token }) => {
  const [password, setPassword] = useState({
    new_password: "",
    confirm_password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.new_password !== password.confirm_password) return toast.error("Kedua password baru tidak sama");

    setIsLoading(true);
    try {
      const response = await fetchChangePassword(token, password);
      handleReset();
      toast.success(response.data.message);
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

  const handleReset = () => {
    setPassword({
      new_password: "",
      confirm_password: "",
    });
  };
  return (
    <>
      <div className=" w-full">
        <div className="flex flex-col lg:flex-row gap-x-4">
          <div className="basis-1/2 mt-3 border border-gray-200 bg-white p-6">
            <h1 className="font-light text-2xl mb-3">Profile</h1>
            <div className="mb-4">
              <label className="block text-gray-700">{user.role == "mahasiswa" ? "NPM" : "NIDN"}</label>
              <input type="text" name="identity" className="w-full p-2 border border-gray-300 rounded" disabled value={user?.identity} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Nama</label>
              <input type="text" name="name" className="w-full p-2 border border-gray-300 rounded" disabled value={user?.name} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Nomor Telepon</label>
              <input type="text" name="phone" className="w-full p-2 border border-gray-300 rounded" disabled value={user?.phone} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Status</label>
              <input type="text" name="role" className="w-full p-2 border border-gray-300 rounded" disabled value={String(user?.role).charAt(0).toUpperCase() + String(user?.role).slice(1)} />
            </div>
          </div>
          <div className="basis-1/2 mt-3 border border-gray-200 bg-white p-6">
            <h1 className="font-light text-2xl mb-3">Ganti Password</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Password Baru</label>
                <input type="password" name="new_password" className="w-full p-2 border border-gray-300 rounded" required value={password.new_password} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Masukkan Ulang Password Baru</label>
                <input type="password" name="confirm_password" className="w-full p-2 border border-gray-300 rounded" required value={password.confirm_password} onChange={handleChange} />
              </div>
              <button type="submit" className="w-full bg-purple-700 text-white p-2 rounded hover:bg-purple-800" disabled={isLoading}>
                {isLoading ? "Mohon tunggu..." : "Ganti Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
