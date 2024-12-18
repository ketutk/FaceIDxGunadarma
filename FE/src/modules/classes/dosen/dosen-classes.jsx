import { useEffect, useState } from "react";
import { SimpleCard } from "../../../templates/cards";
import { toast } from "react-toastify";
import { fetchAddClasses, fetchAllClasses, fetchAllLecturerClasses } from "../../../API/classes";
import Pagination from "../../../templates/pagination";
import { Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import { fetchAllMajor } from "../../../API/major";
import ModalAddClasses from "./component/add-modal";

export const DosenClasses = ({ user, token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [data, setData] = useState({
    page: 1,
    total_page: 1,
    data: null,
  });

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const response = await fetchAllLecturerClasses(token);

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
    <>
      <div className="border border-gray-200 bg-white p-6 w-full flex flex-col gap-y-4">
        <div className="flex flex-col lg:flex-row">
          <div className="basis-1/2">
            <h1 className="font-light text-2xl mb-3">Kelas Yang Anda Miliki</h1>
          </div>
          <div className="basis-1/2 flex justify-end">
            <ModalAddClasses token={token} setShouldRefetch={setShouldRefetch} />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:flex-wrap lg:mt-3 gap-x-4 gap-y-4 w-full">
          {!isLoading && data ? (
            data?.data?.map((item) => {
              return <SimpleCard title={item?.name} subtitle={`${item?.major?.name} (${item?.major?.major_code})`} link={`/dosen/kelas/${item?.id}`} />;
            })
          ) : (
            <>
              <SimpleCard title={"PTA 2023/2024......"} subtitle={"Sistem Informasi...."} link={"#"} linkTitle={"Lihat Kelas"} />
              <SimpleCard title={"PTA 2023/2024......"} subtitle={"Sistem Informasi...."} link={"#"} linkTitle={"Lihat Kelas"} />
              <SimpleCard title={"PTA 2023/2024......"} subtitle={"Sistem Informasi...."} link={"#"} linkTitle={"Lihat Kelas"} />
            </>
          )}
        </div>
        <Pagination currentPage={data.page} totalPages={data.total_page} onPageChange={onPageChange} />
      </div>
    </>
  );
};
