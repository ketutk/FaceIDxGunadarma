import React from "react";
import { useLocation, Link } from "react-router-dom";

const Breadcrumb = () => {
  const basePaths = {
    mahasiswa: "Dashboard",
    dosen: "Dashboard",
    profile: "Profile",
    kelas: "List Kelas",
  };
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const getBreadcrumbName = (key) => {
    return basePaths?.[key] || key.charAt(0).toUpperCase() + key.slice(1);
  };

  return (
    <nav aria-label="breadcrumb" className="text-sm text-gray-500 mb-4">
      <ul className="flex items-center space-x-2 flex-wrap">
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="text-gray-700 text-xl font-light text-nowrap">{index >= 3 ? "Detail Pertemuan" : index >= 2 ? "Detail Kelas" : getBreadcrumbName(value)}</span>
              ) : (
                <Link to={to} className="hover:text-blue-500 text-xl font-light text-nowrap">
                  {index >= 3 ? "Detail Pertemuan" : index >= 2 ? "Detail Kelas" : getBreadcrumbName(value)}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
