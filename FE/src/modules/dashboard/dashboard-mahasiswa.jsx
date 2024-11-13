import { redirect, useNavigate } from "react-router-dom";
import { LiteCard, MainCard } from "./cards";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchMyClasses } from "../../API/classes";

export const DashboardMahasiswa = ({ user, token }) => {
  const navigate = useNavigate();

  const [classes, setClasses] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchMyClasses(token);

        console.log(response.data.data);
        setClasses(response.data.data);
      } catch (e) {
        toast.error(e.response.data.message);
      }
    };

    fetch();
  }, []);

  return (
    <>
      <div className="border border-gray-200 bg-white p-6 w-full">
        <h1 className="font-light text-2xl mb-3">Dashboard Mahasiswa</h1>

        <div className="flex flex-col lg:flex-row lg:flex-wrap lg:mt-3 gap-x-4 gap-y-4 w-full">
          <MainCard title={"Lihat Kelas"} subtitle={"Lihat kelas yang sudah anda ikuti untuk melihat data presensi anda."} link={"/mahasiswa/kelas/my"} linkTitle={"Lihat Kelas"} />
        </div>
      </div>
      <div className="border border-gray-200 bg-white p-6 w-full mt-4">
        <h1 className="font-light text-2xl mb-3">Kelas Yang Baru Diikuti</h1>

        <div className="flex flex-col lg:flex-row lg:flex-wrap lg:mt-3 gap-x-4 gap-y-4 w-full">
          {!isLoading && classes ? (
            classes.map((item) => {
              return <LiteCard title={item?.class?.name} subtitle={`${item?.class?.major?.name} (${item?.class?.major?.major_code})`} link={`/mahasiswa/kelas/${item?.id}`} linkTitle={"Lihat Kelas"} />;
            })
          ) : (
            <>
              <LiteCard title={"PTA 2023/2024 Praktikum Robotika"} subtitle={"Sistem Informasi (KA)"} link={"/mahasiswa/kelas/asdad"} linkTitle={"Lihat Kelas"} />
              <LiteCard title={"PTA 2023/2024 Team Teaching Pelajaran Biologi"} subtitle={"Sistem Informasi (KA)"} link={"/mahasiswa/kelas/asdad"} linkTitle={"Lihat Kelas"} />
              <LiteCard title={"PTA 2023/2024 Team Teaching Pelajaran Biologi"} subtitle={"Sistem Informasi (KA)"} link={"/mahasiswa/kelas/asdad"} linkTitle={"Lihat Kelas"} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
