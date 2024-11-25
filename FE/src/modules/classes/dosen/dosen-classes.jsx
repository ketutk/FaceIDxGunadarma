import { useEffect, useState } from "react";
import { SimpleCard } from "../../../templates/cards";
import { toast } from "react-toastify";
import { fetchAddClasses, fetchAllClasses, fetchAllLecturerClasses } from "../../../API/classes";
import Pagination from "../../../templates/pagination";
import { Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import { fetchAllMajor } from "../../../API/major";

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
      <div className="border border-gray-200 bg-white p-6 w-full mt-4 flex flex-col gap-y-4">
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

const ModalAddClasses = ({ token, setShouldRefetch }) => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    school_year_type: "",
    school_year_start: "",
    school_year_end: "",
    subject: "",
    college_level: "",
    class_number: "",
    major_id: "",
  });
  const [majors, setMajors] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchAllMajor(token);

        setMajors(response.data.data);
      } catch (e) {
        toast.error(e.response.data.message);
      }
    };

    fetch();
  }, []);

  const handleCloseModal = () => {
    setFormData({
      school_year_type: "",
      school_year_start: "",
      school_year_end: "",
      subject: "",
      college_level: "",
      class_number: "",
      major_id: "",
    });
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Subject validation
    if (name === "subject") {
      const isValid = /^[a-zA-Z0-9\s]+$/.test(value);
      if (!isValid && value !== "") {
        toast.error("Subject tidak boleh mengandung simbol!");
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format school_year
    const school_year = `${formData.school_year_start}/${formData.school_year_end}`;

    // Capitalize each word in subject
    const formattedSubject = formData.subject
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    const payload = {
      ...formData,
      school_year,
      subject: formattedSubject,
    };

    setIsLoading(true);

    try {
      const response = await fetchAddClasses(payload, token);

      toast.success(response.data.message);
      setShouldRefetch(true);
      handleCloseModal();
    } catch (e) {
      if (typeof e.response.data.message != "string") {
        Object.values(e.response.data.message).forEach((e) => {
          toast.error(e);
        });
      } else {
        toast.error(e.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button className="px-4 py-2 bg-purple-800 text-white hover:bg-purple-900 rounded text-lg" onClick={() => setOpenModal(true)}>
        Buat Kelas Baru
      </button>
      <Modal show={openModal} onClose={handleCloseModal} size="4xl">
        <Modal.Header>Buat Kelas Baru</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* School Year Type */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Tipe Tahun Ajaran</label>
              <select name="school_year_type" value={formData.school_year_type} onChange={handleInputChange} className="p-2 border border-gray-300 rounded" required>
                <option value="">Pilih Tipe Tahun Ajaran</option>
                <option value="PTA">PTA</option>
                <option value="ATA">ATA</option>
              </select>
            </div>

            {/* School Year */}
            <div className="flex gap-4 w-full">
              <div className="basis-1/2 w-full flex flex-col">
                <label className="text-sm font-semibold">Tahun Awal</label>
                <input type="number" name="school_year_start" value={formData.school_year_start} onChange={handleInputChange} className="p-2 border border-gray-300 rounded w-full" placeholder="Contoh: 2024" required />
              </div>
              <div className="basis-1/2 w-full flex flex-col">
                <label className="text-sm font-semibold">Tahun Akhir</label>
                <input type="number" name="school_year_end" value={formData.school_year_end} onChange={handleInputChange} className="p-2 border border-gray-300 rounded w-full" placeholder="Contoh: 2025" required />
              </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Mata Kuliah</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} className="p-2 border border-gray-300 rounded" placeholder="Nama Mata Kuliah" required />
            </div>

            {/* College Level */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Tingkat</label>
              <input type="number" name="college_level" value={formData.college_level} onChange={handleInputChange} className="p-2 border border-gray-300 rounded" placeholder="Contoh: 4" required />
            </div>

            {/* Class Number */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Nomor Kelas</label>
              <input type="number" name="class_number" value={formData.class_number} onChange={handleInputChange} className="p-2 border border-gray-300 rounded" placeholder="Contoh: 02 atau 31" required />
            </div>

            {/* Major */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Jurusan</label>
              <select name="major_id" value={formData.major_id} onChange={handleInputChange} className="p-2 border border-gray-300 rounded" required>
                <option value="">Pilih Jurusan</option>
                {majors &&
                  majors.map((major) => {
                    return <option value={major.id}>{major.name}</option>;
                  })}
                {/* Add more options as needed */}
              </select>
            </div>

            <button type="submit" className="px-4 py-2 bg-purple-800 text-white hover:bg-purple-900 rounded" disabled={isLoading}>
              {isLoading ? "Mengirim..." : "Tambah Kelas"}
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer className="border border-t border-gray-300"></Modal.Footer>
      </Modal>
    </>
  );
};
