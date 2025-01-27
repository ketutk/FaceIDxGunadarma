import { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { fetchProfile } from "../API/auth";
import { DosenBreadcrumb } from "./breadcrumbs";
import { initFlowbite } from "flowbite";
import faceid from "../assets/faceid.png";

export const NavbarDosen = ({ component: Component }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchProfile(token);
        if (response?.data?.data?.role !== "dosen") {
          navigate(`/${response.data.data.role}/`);
        }
        setUser(response.data.data);
      } catch (e) {
        if (e.response.status === 401) {
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    };
    fetch();
    initFlowbite();
  }, []);

  async function handleLogout() {
    localStorage.clear();
    return navigate("../login");
  }

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open sidebar</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div class="h-full px-3 py-4 overflow-y-auto bg-gradient-to-b from-purple-900 to-purple-700">
          <Link to={"/"} class="flex items-center mb-20">
            <img src={faceid} class="w-full object-cover" alt="Flowbite Logo" />
          </Link>
          <ul class="space-y-2 font-medium">
            <li>
              <Link to={"/dosen"} class="flex items-center p-2 text-white rounded-lg hover:text-black hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg class="w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span class="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={"/dosen/kelas"} class="flex items-center p-2 text-white rounded-lg hover:text-black hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg
                  class="w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.024 3.783A1 1 0 0 1 6 3h12a1 1 0 0 1 .976.783L20.802 12h-4.244a1.99 1.99 0 0 0-1.824 1.205 2.978 2.978 0 0 1-5.468 0A1.991 1.991 0 0 0 7.442 12H3.198l1.826-8.217ZM3 14v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5h-4.43a4.978 4.978 0 0 1-9.14 0H3Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <span class="ms-3">Kelas</span>
              </Link>
            </li>
            <li>
              <Link to={"/dosen/profile"} class="flex items-center p-2 text-white rounded-lg hover:text-black hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg
                  class="w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd" />
                </svg>

                <span class="ms-3">Profile</span>
              </Link>
            </li>
            <li>
              <button class="flex items-center p-2 text-white rounded-lg hover:text-black hover:bg-gray-100 dark:hover:bg-gray-700 group w-full" onClick={handleLogout}>
                <svg
                  class="w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                </svg>

                <span class="ms-3">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <div class="p-4 sm:ml-64 bg-gray-100 min-h-screen">
        <div class="p-4 rounded-lg ">
          <DosenBreadcrumb />
          {user && token && <Component user={user} token={token} />}
        </div>
      </div>
    </>
  );
};
