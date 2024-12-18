import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchDosenDetailClasses } from "../../../API/classes";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Tabs } from "flowbite-react";
import { formatDateIndonesia } from "../../../helpers/date";
import { customTabs } from "./theme/tabs";
import DeleteModal from "./component/delete-modal";
import ModalEditClasses from "./component/edit-modal";
import ModalAddMeets from "./component/add-meet-modal";

export const DosenDetailClasses = ({ user, token }) => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  const [shouldRefetch, setShouldRefetch] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchDosenDetailClasses(id, token);
        console.log(response.data.data);
        setClassData(response.data.data);
      } catch (e) {
        toast.error(e.response.data.message);
        navigate("/dosen/kelas");
      } finally {
        setShouldRefetch(false);
      }
    };
    if (shouldRefetch) fetch();
  }, [shouldRefetch]);

  return classData ? (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div>
            <h2 className="text-2xl font-bold">{classData.name}</h2>
            <p className="text-gray-600">
              {classData.subject} - Tingkat {classData.college_level}, Kelas Nomor {classData.class_number}
            </p>
          </div>
          <div className="flex gap-4">
            <DeleteModal classes_id={id} token={token} />
            <ModalEditClasses token={token} setShouldRefetch={setShouldRefetch} classToEdit={classData} />
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <p className="text-gray-600">Jumlah Pertemuan</p>
            <p className="text-2xl font-bold">{classData?._count?.class_meets}</p>
          </div>
          <div>
            <p className="text-gray-600">Jumlah Mahasiswa</p>
            <p className="text-2xl font-bold">{classData?._count?.student_classes}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <Tabs className="border-b border-gray-200" theme={customTabs} variant="underline">
          <Tabs.Item title="Pertemuan" className="">
            <ModalAddMeets token={token} setShouldRefetch={setShouldRefetch} classData={classData} />
            <div className="p-6 overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Pertemuan ke-</th>
                    <th className="border border-gray-300 px-4 py-2">Waktu Mulai Pertemuan</th>
                    <th className="border border-gray-300 px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {classData.class_meets.map((meeting, index) => (
                    <tr key={meeting.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 text-center">{meeting.meet_number}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-nowrap">{formatDateIndonesia(meeting.meet_start, true)}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <Link to={`./${meeting.id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-nowrap">
                          Lihat Detail
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tabs.Item>
          <Tabs.Item title="Daftar Mahasiswa" activeClassName="border-b-4 border-purple-500" className="hover:text-purple-500">
            <div className="p-6 overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-nowrap">NPM</th>
                    <th className="border border-gray-300 px-4 py-2 text-nowrap">Nama</th>
                    <th className="border border-gray-300 px-4 py-2 text-nowrap">Nomor Telepon</th>
                    <th className="border border-gray-300 px-4 py-2 text-nowrap">Jumlah Kehadiran</th>
                    <th className="border border-gray-300 px-4 py-2 text-nowrap">Presentase</th>
                  </tr>
                </thead>
                <tbody>
                  {classData.student_classes.map((studentClass) => (
                    <tr key={studentClass.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 text-center text-nowrap">{studentClass.students.identity}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-nowrap ">{studentClass.students.name}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-nowrap">{studentClass.students.phone}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-nowrap">{studentClass._count.student_presences}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center text-nowrap">{`${Math.ceil((studentClass._count.student_presences / classData?._count?.class_meets) * 100)}%` || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tabs.Item>
        </Tabs>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};
