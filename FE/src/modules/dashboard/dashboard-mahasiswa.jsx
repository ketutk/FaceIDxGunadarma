import { redirect, useNavigate } from "react-router-dom";

export const DashboardMahasiswa = () => {
  const navigate = useNavigate();

  async function handleLogout() {
    localStorage.clear();
    return navigate("../login");
  }
  return (
    <div>
      <h1>Dashboard Mahasiswa</h1>
      <button className="px-4 py-2 bg-red-600 text-white" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
