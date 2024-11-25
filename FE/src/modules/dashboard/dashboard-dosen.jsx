import { useEffect, useState } from "react";
import { fetchNewestLecturerClasses } from "../../API/classes";
import { toast } from "react-toastify";
import { LiteCard, MainCard } from "../../templates/cards";

export const DashboardDosen = ({ user, token }) => {
  const [classes, setClasses] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const response = await fetchNewestLecturerClasses(token);
        setClasses(response.data.data);
      } catch (e) {
        toast.error(e.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);
  return (
    <>
      <div className="border border-gray-200 bg-white p-6 w-full">
        <h1 className="font-light text-2xl mb-3">Dashboard Dosen</h1>

        <div className="flex flex-col lg:flex-row lg:flex-wrap lg:mt-3 gap-x-4 gap-y-4 w-full">
          <MainCard title={"Kelas Anda"} subtitle={"Lihat kelas yang sudah dibuat"} link={"/dosen/kelas"} linkTitle={"Lihat Kelas"} />
        </div>
      </div>
      <div className="border border-gray-200 bg-white p-6 w-full mt-4">
        <h1 className="font-light text-2xl mb-3">Aktivitas Kelas Terbaru</h1>

        <div className="flex flex-col lg:flex-row lg:flex-wrap lg:mt-3 gap-x-4 gap-y-4 w-full">
          {!isLoading && classes ? (
            classes.map((item) => {
              return <LiteCard title={item?.name} subtitle={`${item?.major?.name} (${item?.major?.major_code})`} link={`/dosen/kelas/${item?.id}`} linkTitle={"Lihat Kelas"} />;
            })
          ) : (
            <>
              <LiteCard title={"PTA 2023/2024 Praktikum Robotika"} subtitle={"Sistem Informasi (KA)"} link={"/mahasiswa/class"} linkTitle={"Lihat Kelas"} />
              <LiteCard title={"PTA 2023/2024 Team Teaching Pelajaran Biologi"} subtitle={"Sistem Informasi (KA)"} link={"/mahasiswa/class"} linkTitle={"Lihat Kelas"} />
              <LiteCard title={"PTA 2023/2024 Team Teaching Pelajaran Biologi"} subtitle={"Sistem Informasi (KA)"} link={"/mahasiswa/class"} linkTitle={"Lihat Kelas"} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
