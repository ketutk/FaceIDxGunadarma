import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchStudentById, fetchStudentClassesById, fetchStudentClassPresences } from "../../../API/student";
import Pagination from "../../../templates/pagination";
import { formatDateIndonesia } from "../../../helpers/date";

const DetailKelasMahasiswa = ({ user, token }) => {
  const navigate = useNavigate();

  const { id, class_id } = useParams();

  const [data, setData] = useState();
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
        const response = await fetchStudentClassPresences(id, class_id, token);

        console.log(response.data.data);
        setData(response.data.data);
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
        <h1 className="text-2xl font-light">Detail Kelas Mahasiswa</h1>

        {student && (
          <div className="mt-4">
            <h2 className="text-2xl font-medium mb-4">Profil Mahasiswa</h2>
            <p>Nama : {student?.name}</p>
            <p>NPM : {student?.identity}</p>
            <p>No. Telp : {student?.phone}</p>
          </div>
        )}
      </div>
      <div className="border border-gray-200 bg-white p-6 w-full mt-4 flex flex-col gap-y-8">
        {!isLoading && data && (
          <>
            {/* Section 1: Ringkasan */}
            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-semibold">Ringkasan Kehadiran</h3>
                <p>Jumlah Kehadiran: {data?._count?.student_presences || 0}</p>
                <p>Total Pertemuan: {data?.class?._count?.class_meets || 0}</p>
                <p>Presentase Kehadiran: {`${Math.ceil((data?._count?.student_presences / data?.class?._count?.class_meets) * 100)}%` || 0}</p>
              </div>
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-semibold">Info Mata Kuliah</h3>
                <p>Kelas: {data?.class?.name}</p>
                <p>Dosen: {data?.class?.lecturer?.name}</p>
                <p>Nomor Telepon: {data?.class?.lecturer?.phone}</p>
              </div>
            </div>

            {/* Section 2: Tabel Detail Kehadiran */}
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold mb-4">Detail Kehadiran</h3>
              <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-200 p-2">Pertemuan ke-</th>
                      <th className="border border-gray-200 p-2">Waktu Pertemuan</th>
                      <th className="border border-gray-200 p-2">Waktu Absen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.student_presences?.map((presence, index) => (
                      <tr key={presence.id} className="text-center">
                        <td className="border border-gray-200 p-2">{presence.class_meet.meet_number}</td>
                        <td className="border border-gray-200 p-2">{formatDateIndonesia(presence.class_meet.meet_start, true)}</td>
                        <td className="border border-gray-200 p-2">{formatDateIndonesia(presence.created_at, true)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailKelasMahasiswa;
