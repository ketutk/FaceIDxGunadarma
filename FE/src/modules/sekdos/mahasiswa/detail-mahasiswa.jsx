import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchStudentById, fetchStudentClassesById } from "../../../API/student";
import Pagination from "../../../templates/pagination";

const DetailMahasiswa = ({ user, token }) => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [data, setData] = useState({
    page: 1,
    totalPages: 1,
    data: null,
  });
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [student, setStudent] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const response = await fetchStudentById(id, token);

        console.log(response?.data?.data);
        setStudent(response?.data?.data);
      } catch (e) {
        toast.error(e?.response?.data?.message || "Terjadi kesalahan saat mengambil data");
        navigate("/sekdos/mahasiswa");
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const response = await fetchStudentClassesById(id, data.page, token);
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

  const onPageChange = (page) => {
    setData((prevData) => ({
      ...prevData,
      page: page,
    }));
    setShouldRefetch(true);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-light">Detail Mahasiswa</h1>

        {student && (
          <div className="mt-4">
            <h2 className="text-2xl font-medium mb-4">Profil Mahasiswa</h2>
            <p>Nama : {student?.name}</p>
            <p>NPM : {student?.identity}</p>
            <p>No. Telp : {student?.phone}</p>
          </div>
        )}
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        {isLoading && <div className="text-center">Memuat data...</div>}
        {!isLoading && data && (
          <>
            <div className="p-6 overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-nowrap">Kelas</th>
                    <th className="border border-gray-300 px-4 py-2 text-nowrap">Dosen</th>
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
                          <td className="border border-gray-300 px-4 py-2 text-nowrap">{item.class.name}</td>
                          <td className="border border-gray-300 px-4 py-2 text-nowrap ">{item.class.lecturer.name}</td>
                          <td className="border border-gray-300 px-4 py-2 text-center text-nowrap">
                            <Link to={`./${item.class.id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-nowrap">
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
          </>
        )}
      </div>
    </div>
  );
};

export default DetailMahasiswa;
