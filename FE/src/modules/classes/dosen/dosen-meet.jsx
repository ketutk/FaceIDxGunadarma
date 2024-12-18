import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchDosenClassesMeet, fetchDosenDetailClasses } from "../../../API/classes";
import { Link, useParams } from "react-router-dom";
import { Tabs } from "flowbite-react";
import { formatDateIndonesia } from "../../../helpers/date";
import { customTabs } from "./theme/tabs";
import DeleteModal from "./component/delete-modal";
import ModalEditClasses from "./component/edit-modal";
import ModalAddMeets from "./component/add-meet-modal";
import { FaceModalPresensi } from "./component/face-modal";

export const DosenClassesMeet = ({ user, token }) => {
  const { id, idp } = useParams();
  const [meetData, setMeetData] = useState(null);
  const [shouldRefetch, setShouldRefetch] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchDosenClassesMeet(id, idp, token);
        console.log(response.data.data);
        setMeetData(response.data.data);
      } catch (e) {
        toast.error(e.response.data.message);
      } finally {
        setShouldRefetch(false);
      }
    };
    if (shouldRefetch) fetch();
  }, [shouldRefetch]);

  return meetData ? (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div>
            <h2 className="text-2xl font-bold">{meetData.class.name}</h2>
            <p className="text-gray-600">
              {meetData.class.subject} - Tingkat {meetData.class.college_level}, Kelas Nomor {meetData.class.class_number}
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <p className="text-gray-600">Pertemuan Ke</p>
            <p className="text-2xl font-bold">{meetData?.meet_number}</p>
          </div>
          <div>
            <p className="text-gray-600">Jumlah Hadir</p>
            <p className="text-2xl font-bold">{meetData?._count?.student_presences}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <Tabs className="border-b border-gray-200" theme={customTabs} variant="underline">
          <Tabs.Item title="Presensi Mahasiswa" className="">
            {/* <ModalAddMeets token={token} setShouldRefetch={setShouldRefetch} meetData={meetData} /> */}
            {<FaceModalPresensi classes_id={meetData.class.id} meet_id={meetData.id} token={token} setShouldRefetch={setShouldRefetch} />}
            <div className="p-6 overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">NPM</th>
                    <th className="border border-gray-300 px-4 py-2">Nama</th>
                    <th className="border border-gray-300 px-4 py-2">Waktu Presensi</th>
                  </tr>
                </thead>
                <tbody>
                  {meetData.student_presences.length > 0 ? (
                    meetData.student_presences.map((presence, index) => (
                      <tr key={presence.student_class.students.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2 text-center text-nowrap">{presence.student_class.students.identity}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center text-nowrap">{presence.student_class.students.name}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center text-nowrap">{formatDateIndonesia(presence.created_at, true)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr className="hover:bg-gray-50">
                      <td colSpan={3} className="border border-gray-300 px-4 py-2 text-center text-nowrap">
                        Belum ada data presensi
                      </td>
                    </tr>
                  )}
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
