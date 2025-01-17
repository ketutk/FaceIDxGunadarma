import { Link } from "react-router-dom";
import Pagination from "../../../templates/pagination";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchStudent } from "../../../API/student";

const Mahasiswa = ({ user, token }) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState({
    page: 1,
    totalPages: 1,
    data: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRefetch, setShouldRefetch] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const response = await fetchStudent(search, data.page, token);
        const { page, total_page, data: datas } = response.data.data;

        setData({
          page,
          totalPages: total_page,
          data: datas,
        });
      } catch (e) {
        toast.error(e.response.data.message);
      } finally {
        setIsLoading(false);
        setShouldRefetch(false);
      }
    };

    if (shouldRefetch) {
      fetch();
    }
  }, [shouldRefetch]);

  const handleSearch = (e) => {
    e.preventDefault();
    setShouldRefetch(true);
  };

  const onPageChange = (page) => {
    setData((prevData) => ({
      ...prevData,
      page: page,
    }));
    setShouldRefetch(true);
  };

  return (
    <div className="border border-gray-200 p-6 w-full bg-white rounded-lg">
      <h2 className="text-2xl font-bold">List Mahasiswa</h2>

      <form className="mt-10 flex flex-col lg:flex-row gap-x-4 gap-y-4 lg:gap-y-0 px-6" onSubmit={handleSearch}>
        <input type="text" name="identity" className="w-full p-2 border border-gray-300 rounded" placeholder="Cari berdasarkan NPM/Nama/No.Telp..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="submit" className="px-4 py-2 bg-purple-800 hover:bg-purple-900 text-white rounded text-nowrap text-lg" disabled={isLoading}>
          {isLoading ? "Mencari..." : "Cari Mahasiswa"}
        </button>
      </form>

      <div className="p-6 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-nowrap">NPM</th>
              <th className="border border-gray-300 px-4 py-2 text-nowrap">Nama</th>
              <th className="border border-gray-300 px-4 py-2 text-nowrap">Nomor Telepon</th>
              <th className="border border-gray-300 px-4 py-2 text-nowrap">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="text-center">
                  Sedang memuat...
                </td>
              </tr>
            ) : data && data.data && data.data.length > 0 ? (
              data.data.map((item) => {
                return (
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-center text-nowrap">{item.identity}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-nowrap ">{item.name}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-nowrap">{item.phone}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center text-nowrap">
                      <Link to={`./mahasiswa/${item.id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-nowrap">
                        Lihat Detail
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="">
                <td colSpan={4} className="text-center py-4">
                  Tidak menemukan data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {!isLoading && <Pagination currentPage={data.page} totalPages={data.totalPages} onPageChange={onPageChange} />}
    </div>
  );
};

export default Mahasiswa;
