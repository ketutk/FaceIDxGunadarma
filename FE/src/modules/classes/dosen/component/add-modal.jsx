import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchAllMajor } from "../../../../API/major";
import { fetchAddClasses } from "../../../../API/classes";

const ModalAddClasses = ({ token, setShouldRefetch }) => {
  const currentYear = new Date().getFullYear();
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    school_year_type: "",
    school_year_start: currentYear,
    school_year_end: currentYear + 1,
    subject: "",
    college_level: "4", // Set default to 4
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
      college_level: "4", // Reset to 4
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

    // School year start validation and auto-set end year
    if (name === "school_year_start") {
      const startYear = parseInt(value);
      if (startYear < currentYear - 1 || startYear > currentYear) {
        toast.error(`Tahun awal harus antara ${currentYear - 1} dan ${currentYear}`);
        return;
      }
      setFormData((prev) => ({
        ...prev,
        school_year_start: value,
        school_year_end: startYear ? (startYear + 1).toString() : "",
      }));
      return;
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
              <select name="school_year_type" value={formData.school_year_type} onChange={handleInputChange} className="p-2 border border-gray-300 rounded" required disabled={isLoading}>
                <option value="">Pilih Tipe Tahun Ajaran</option>
                <option value="PTA">PTA</option>
                <option value="ATA">ATA</option>
              </select>
            </div>

            {/* School Year */}
            <div className="flex gap-4 w-full">
              <div className="basis-1/2 w-full flex flex-col">
                <label className="text-sm font-semibold">Tahun Awal</label>
                <input
                  type="number"
                  name="school_year_start"
                  value={formData.school_year_start}
                  onChange={handleInputChange}
                  min={currentYear - 1}
                  max={currentYear}
                  className="p-2 border border-gray-300 rounded w-full"
                  placeholder={`Minimal ${currentYear - 1}`}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="basis-1/2 w-full flex flex-col">
                <label className="text-sm font-semibold">Tahun Akhir</label>
                <input type="number" name="school_year_end" value={formData.school_year_end} className="p-2 border border-gray-300 rounded w-full bg-gray-100" placeholder="" required disabled={true} />
              </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Mata Kuliah</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} className="p-2 border border-gray-300 rounded" placeholder="Nama Mata Kuliah" required disabled={isLoading} />
            </div>

            {/* College Level - Fixed to 4 */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Tingkat</label>
              <input type="number" name="college_level" value="4" className="p-2 border border-gray-300 rounded bg-gray-100" required disabled={true} />
            </div>

            {/* Class Number */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Nomor Kelas</label>
              <input type="number" name="class_number" value={formData.class_number} onChange={handleInputChange} className="p-2 border border-gray-300 rounded" placeholder="Contoh: 02 atau 31" required disabled={isLoading} />
            </div>

            {/* Major */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Jurusan</label>
              <select name="major_id" value={formData.major_id} onChange={handleInputChange} className="p-2 border border-gray-300 rounded" required disabled={isLoading}>
                <option value="">Pilih Jurusan</option>
                {majors &&
                  majors.map((major) => (
                    <option key={major.id} value={major.id}>
                      {major.name}
                    </option>
                  ))}
              </select>
            </div>

            <button type="submit" className="px-4 py-2 bg-purple-800 text-white hover:bg-purple-900 rounded disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading}>
              {isLoading ? "Mengirim..." : "Tambah Kelas"}
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer className="border border-t border-gray-300"></Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddClasses;
