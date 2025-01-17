import { useLocation, Link } from "react-router-dom";

// Mahasiswa Breadcrumb
const MahasiswaBreadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const getBreadcrumbName = (pathname) => {
    // Match exact patterns for mahasiswa routes
    if (pathname === "/mahasiswa" || pathname === "/mahasiswa/") {
      return "Dashboard Mahasiswa";
    }
    if (pathname === "/mahasiswa/profile") {
      return "Profile";
    }
    if (pathname === "/mahasiswa/kelas") {
      return "List Kelas";
    }
    if (pathname.match(/^\/mahasiswa\/kelas\/[^/]+$/)) {
      return "Detail Kelas";
    }
    return "";
  };

  const getBreadcrumbs = () => {
    const breadcrumbs = [];
    let currentPath = "";

    for (let i = 0; i < pathnames.length; i++) {
      currentPath += `/${pathnames[i]}`;
      const name = getBreadcrumbName(currentPath);
      if (name) {
        breadcrumbs.push({ path: currentPath, name });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav aria-label="breadcrumb" className="text-sm text-gray-500 mb-4">
      <ul className="flex items-center space-x-2 flex-wrap">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center">
            <span className="mx-2">/</span>
            {index === breadcrumbs.length - 1 ? (
              <span className="text-gray-700 text-xl font-light text-nowrap">{crumb.name}</span>
            ) : (
              <Link to={crumb.path} className="hover:text-blue-500 text-xl font-light text-nowrap">
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Dosen Breadcrumb
const DosenBreadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const getBreadcrumbName = (pathname) => {
    // Match exact patterns for dosen routes
    if (pathname === "/dosen" || pathname === "/dosen/") {
      return "Dashboard Dosen";
    }
    if (pathname === "/dosen/profile") {
      return "Profile";
    }
    if (pathname === "/dosen/kelas") {
      return "List Kelas";
    }
    if (pathname.match(/^\/dosen\/kelas\/[^/]+$/)) {
      return "Detail Kelas";
    }
    if (pathname.match(/^\/dosen\/kelas\/[^/]+\/[^/]+$/)) {
      return "Detail Pertemuan";
    }
    return "";
  };

  const getBreadcrumbs = () => {
    const breadcrumbs = [];
    let currentPath = "";

    for (let i = 0; i < pathnames.length; i++) {
      currentPath += `/${pathnames[i]}`;
      const name = getBreadcrumbName(currentPath);
      if (name) {
        breadcrumbs.push({ path: currentPath, name });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav aria-label="breadcrumb" className="text-sm text-gray-500 mb-4">
      <ul className="flex items-center space-x-2 flex-wrap">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center">
            <span className="mx-2">/</span>
            {index === breadcrumbs.length - 1 ? (
              <span className="text-gray-700 text-xl font-light text-nowrap">{crumb.name}</span>
            ) : (
              <Link to={crumb.path} className="hover:text-blue-500 text-xl font-light text-nowrap">
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Sekdos Breadcrumb
const SekdosBreadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const getBreadcrumbName = (pathname) => {
    // Match exact patterns for sekdos routes
    if (pathname === "/sekdos" || pathname === "/sekdos/") {
      return "Dashboard Sekdos";
    }
    if (pathname === "/sekdos/mahasiswa") {
      return "List Mahasiswa";
    }
    if (pathname === "/sekdos/registration") {
      return "Registrasi Dosen";
    }
    if (pathname.match(/^\/sekdos\/mahasiswa\/[^/]+$/)) {
      return "Detail Mahasiswa";
    }
    if (pathname.match(/^\/sekdos\/mahasiswa\/[^/]+\/[^/]+$/)) {
      return "Detail Kelas";
    }
    return "";
  };

  const getBreadcrumbs = () => {
    const breadcrumbs = [];
    let currentPath = "";

    for (let i = 0; i < pathnames.length; i++) {
      currentPath += `/${pathnames[i]}`;
      const name = getBreadcrumbName(currentPath);
      if (name) {
        breadcrumbs.push({ path: currentPath, name });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav aria-label="breadcrumb" className="text-sm text-gray-500 mb-4">
      <ul className="flex items-center space-x-2 flex-wrap">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center">
            <span className="mx-2">/</span>
            {index === breadcrumbs.length - 1 || crumb.name == "List Mahasiswa" ? (
              <span className="text-gray-700 text-xl font-light text-nowrap">{crumb.name}</span>
            ) : (
              <Link to={crumb.path} className="hover:text-blue-500 text-xl font-light text-nowrap">
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { MahasiswaBreadcrumb, DosenBreadcrumb, SekdosBreadcrumb };
