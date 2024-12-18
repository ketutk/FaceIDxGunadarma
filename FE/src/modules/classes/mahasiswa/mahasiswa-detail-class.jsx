import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchJoinClasses, fetchMahasiswaDetailClasses } from "../../../API/classes";
import { formatDateIndonesia } from "../../../helpers/date";

export const MahasiswaDetailClasses = ({ user, token }) => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const response = await fetchMahasiswaDetailClasses(id, token);
        setData(response.data.data);
      } catch (e) {
        if (e.response.status === 404) toast.error(e.response.data.message);
        else toast.error(e.response.data.message);
        navigate("/mahasiswa/kelas");
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  const handleJoinClass = async () => {
    setIsLoading(true);
    try {
      const response = await fetchJoinClasses(id, token);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate(0);
      }, 1000);
    } catch (e) {
      toast.error(e.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {data ? (
        <>
          {/* Header Kelas */}
          <div className="border border-gray-200 bg-white p-6 w-full mt-4 flex flex-col gap-y-4">
            <h1 className="font-light text-2xl">
              {data?.name} | {data?.major?.name} ({data?.major?.major_code})
            </h1>
            <h3 className="text-xl font-light">
              <span className="font-semibold">{data?.lecturer?.name}</span> | {data?.lecturer?.identity}
            </h3>
          </div>

          {/* Konten */}
          <div className="border border-gray-200 bg-white p-6 w-full mt-4 flex flex-col gap-y-8">
            {data?.is_joined ? (
              <>
                {/* Section 1: Ringkasan */}
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                  <div className="flex flex-col items-start">
                    <h3 className="text-lg font-semibold">Ringkasan Kehadiran</h3>
                    <p>Jumlah Kehadiran: {data?.student_class?._count?.student_presences || 0}</p>
                    <p>Total Pertemuan: {data?._count?.class_meets || 0}</p>
                    <p>Presentase Kehadiran: {`${Math.ceil((data?.student_class?._count?.student_presences / data?._count?.class_meets) * 100)}%` || 0}</p>
                  </div>
                  <div className="flex flex-col items-start">
                    <h3 className="text-lg font-semibold">Info Lainnya</h3>
                    <p>
                      Tahun Ajaran: {data?.school_year_type} {data?.school_year}
                    </p>
                    <p>Dosen: {data?.lecturer?.name}</p>
                    <p>Nomor Telepon: {data?.lecturer?.phone}</p>
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
                        {data?.student_class?.student_presences?.map((presence, index) => (
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
            ) : (
              <div className="flex flex-col items-center gap-y-4">
                <h1 className="font-light text-lg text-center">Anda belum bergabung dengan kelas ini.</h1>
                <button className="px-4 py-2 rounded bg-purple-800 text-white hover:bg-purple-900" onClick={handleJoinClass} disabled={isLoading}>
                  {isLoading ? "Mohon tunggu.." : "Klik Untuk Gabung Kelas"}
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="border border-gray-200 bg-white p-6 w-full mt-4 flex flex-col gap-y-4">
          <h1 className="font-light text-2xl mb-3">Loading...</h1>
        </div>
      )}
    </>
  );
};
