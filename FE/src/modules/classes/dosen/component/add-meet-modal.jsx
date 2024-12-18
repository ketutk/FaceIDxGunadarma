import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchAllMajor } from "../../../../API/major";
import { fetchAddClasses, fetchAddClassesMeet } from "../../../../API/classes";

const ModalAddMeets = ({ token, setShouldRefetch, classData }) => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    meet_date: null,
    meet_hour: null,
    meet_minute: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData({
      meet_date: null,
      meet_hour: null,
      meet_minute: null,
    });
  }, [openModal]);

  const handleCloseModal = () => {
    setFormData({
      meet_date: null,
      meet_hour: null,
      meet_minute: null,
    });
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const { meet_date, meet_hour, meet_minute } = formData;

      // Validate input
      if (!meet_date || meet_hour === null || meet_minute === null) {
        throw new Error("Lengkapi semua bidang waktu mulai pertemuan.");
      }

      // Combine date, hour, and minute into a valid Date format
      const meet_start = new Date(`${meet_date}T${String(meet_hour).padStart(2, "0")}:${String(meet_minute).padStart(2, "0")}:00`);

      const response = await fetchAddClassesMeet({ meet_start }, classData.id, token);

      toast.success(response.data.message);
      setShouldRefetch(true);
      handleCloseModal();
    } catch (e) {
      toast.error(e.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-4 mx-6 " onClick={() => setOpenModal(true)}>
        Tambah Pertemuan
      </button>
      <Modal show={openModal} onClose={handleCloseModal} size="2xl">
        <Modal.Header>Buat Pertemuan Baru</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div className=" justify-start gap-x-4 flex flex-col md:flex-row w-full">
              {/* Meet Start */}
              <div className="flex flex-col w-full">
                <label className="text-sm font-semibold" htmlFor="meet_date">
                  Tanggal Pertemuan
                </label>
                <input type="date" id="meet_date" name="meet_date" value={formData.meet_date} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="justify-start gap-x-4 flex flex-col md:flex-row w-full">
              {/* Meet Hour */}
              <div className="flex flex-col md:basis-1/2 w-full">
                <label className="text-sm font-semibold" htmlFor="meet_hour">
                  Jam
                </label>
                <input type="number" id="meet_hour" name="meet_hour" min="0" max="23" value={formData.meet_hour} onChange={handleInputChange} required placeholder="Antara 0-23" />
              </div>
              {/* Meet Minute */}
              <div className="flex flex-col md:basis-1/2 w-full">
                <label className="text-sm font-semibold" htmlFor="meet_minute">
                  Menit
                </label>
                <input type="number" id="meet_minute" name="meet_minute" min="0" max="59" value={formData.meet_minute} onChange={handleInputChange} required placeholder="Antara 0-59" />
              </div>
            </div>

            <button type="submit" className="px-4 py-2 bg-purple-800 text-white hover:bg-purple-900 rounded" disabled={isLoading}>
              {isLoading ? "Mengirim..." : "Tambah Pertemuan"}
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer className="border border-t border-gray-300"></Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddMeets;
