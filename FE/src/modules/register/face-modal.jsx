import { Button, Modal } from "flowbite-react";
import { useEffect, useRef, useState } from "react";

export function FaceModal({ modelsLoaded, setFaceDescriptor, faceapi }) {
  const videoRef = useRef();
  const [openModal, setOpenModal] = useState(false);
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let stream;

    if (modelsLoaded && openModal) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((videoStream) => {
          stream = videoStream;
          if (videoRef.current) {
            videoRef.current.srcObject = videoStream;
          }
          console.log("oke");
        })
        .catch((err) => {
          console.error("Error accessing webcam:", err);
        });
    }

    return () => {
      // Stop the video stream if the modal is closed
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        console.log("Webcam access stopped");
      }
    };
  }, [modelsLoaded, openModal]);

  const handleCapture = async () => {
    setIsLoading(true);
    const detections = await faceapi.detectSingleFace(videoRef.current).withFaceLandmarks().withFaceDescriptor();
    if (detections) {
      setFaceDescriptor(detections.descriptor);
      setSuccess("Wajah berhasil terdeteksi");
      setIsLoading(false);
      setTimeout(() => {
        handleCloseModal(false);
      }, 2000);
    } else {
      setError("Wajah tidak terdeteksi");
      setIsLoading(false);
      setTimeout(() => {
        setError();
      }, 1000);
    }
  };

  async function handleCloseModal() {
    setError();
    setSuccess();
    setOpenModal(false);
  }

  return (
    <>
      <button type="button" onClick={() => setOpenModal(true)} className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 rounded">
        Deteksi wajah disini
      </button>
      <Modal show={openModal} onClose={handleCloseModal} size="6xl">
        <Modal.Header>Deteksi Wajah</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col md:flex-row">
            <div className="basis-1/2 w-full h-80 bg-black">
              <video ref={videoRef} autoPlay className="h-full w-full" />
            </div>
            <div className="basis-1/2 w-full flex flex-col justify-center items-center gap-y-4">
              {success && (
                <>
                  <p className="text-center text-green-500 font-bold">{success}</p>
                </>
              )}
              {error && (
                <>
                  <p className="text-center text-red-500 font-bold">{error}</p>
                </>
              )}
              {!success && !error && (
                <>
                  <p className="text-center">
                    Pastikan wajah anda mengarah ke kamera dan terlihat jelas, lalu tekan tombol <span className="font-bold">Rekam Wajah</span>
                  </p>
                  <button onClick={handleCapture} className="px-4 py-2 outline-purple-700 outline rounded hover:outline-purple-300 hover:bg-purple-700 hover:text-white" disabled={isLoading}>
                    {isLoading ? "Mendeteksi..." : "Rekam Wajah"}
                  </button>
                </>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
