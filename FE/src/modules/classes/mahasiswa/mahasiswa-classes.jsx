import { useEffect, useState } from "react";
import { SimpleCard } from "../../../templates/cards";
import { toast } from "react-toastify";
import { fetchAllClasses, fetchAllMyClasses } from "../../../API/classes";
import Pagination from "../../../templates/pagination";
import { Modal } from "flowbite-react";
import { Link } from "react-router-dom";

export const MahasiswaClasses = ({ user, token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    page: 1,
    total_page: 1,
    data: null,
  });

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const response = await fetchAllMyClasses(token, data?.page);

        setData(response.data.data);
      } catch (e) {
        toast.error(e.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [data.page]);

  const onPageChange = (page) => {
    setData((prevData) => ({
      ...prevData,
      page: page,
    }));
  };

  return (
    <>
      <div className="border border-gray-200 bg-white p-6 w-full mt-4 flex flex-col gap-y-4">
        <div className="flex flex-col lg:flex-row">
          <div className="basis-1/2">
            <h1 className="font-light text-2xl mb-3">Kelas Yang Sudah Bergabung</h1>
          </div>
          <div className="basis-1/2 flex justify-end">
            <ModalJoinClasses token={token} />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:flex-wrap lg:mt-3 gap-x-4 gap-y-4 w-full">
          {!isLoading && data ? (
            data?.data?.map((item) => {
              return <SimpleCard title={item?.class?.name} subtitle={`${item?.class?.major?.name} (${item?.class?.major?.major_code})`} link={`/mahasiswa/kelas/${item?.class?.id}`} />;
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

const ModalJoinClasses = ({ token }) => {
  const [openModal, setOpenModal] = useState(false);
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [classes, setClasses] = useState([]);

  async function handleCloseModal() {
    setError();
    setSuccess();
    setOpenModal(false);
  }

  async function handleSearch(e) {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await fetchAllClasses(search, token);

      setClasses(response.data.data);
    } catch (e) {
      toast.error(e.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <button className="px-4 py-2 bg-purple-800 text-white hover:bg-purple-900 rounded text-lg" onClick={() => setOpenModal(true)}>
        Cari Kelas
      </button>
      <Modal show={openModal} onClose={handleCloseModal} size="4xl">
        <Modal.Header>Cari Kelas</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col">
            <form onSubmit={handleSearch} className="mb-4 flex flex-col lg:flex-row gap-x-4 gap-y-4 lg:gap-y-0">
              <input type="text" name="identity" className="w-full p-2 border border-gray-300 rounded" placeholder="Cari kelas disini..." value={search} onChange={(e) => setSearch(e.target.value)} />
              <button type="submit" className="px-4 py-2 bg-purple-800 hover:bg-purple-900 text-white rounded text-nowrap text-lg" disabled={isLoading}>
                {isLoading ? "Mencari..." : "Cari Kelas"}
              </button>
            </form>
            <h1 className="font-light text-2xl mb-5">Hasil Pencarian :</h1>
            <div className="flex flex-col w-full max-h-[350px]">
              <div className="overflow-auto">
                {classes.length > 0 ? (
                  classes.map((item) => {
                    return (
                      <Link to={`/mahasiswa/kelas/${item?.id}`}>
                        <div className="hover:bg-gray-100 p-4 cursor-pointer">
                          <h1 className="font-light text-2xl hover:underline text-blue-600">{item?.name}</h1>
                          <h3 className="text-lg font-light">
                            <span className="font-semibold">{item?.lecturer?.name}</span> | {item?.lecturer?.identity}
                          </h3>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
