import { Modal } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { toast } from "react-toastify";
import { fetchAddPresence } from "../../../../API/classes";

export function FaceModalPresensi({ classes_id, meet_id, token, setShouldRefetch }) {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [openModal, setOpenModal] = useState(false);
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [faceDescriptor, setFaceDescriptor] = useState();
  // const [lastFrame, setLastFrame] = useState(null); // For storing the last frame
  const motionThreshold = 50; // Threshold for detecting significant motion

  useEffect(() => {
    const loadModels = async () => {
      const canva = canvasRef.current;
      const MODEL_URL = `/models`;

      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      // Create a dummy canvas to "warm up" the model
      const offscreenCanvas = document.createElement("canvas");
      offscreenCanvas.width = 300; // Use any small size for faster processing
      offscreenCanvas.height = 300;
      const context = offscreenCanvas.getContext("2d");

      // Fill the canvas with dummy data (e.g., a blank rectangle or gradient)
      context.fillStyle = "gray";
      context.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

      try {
        // Perform a dummy detection to warm up the models
        await faceapi.detectSingleFace(offscreenCanvas).withFaceLandmarks().withFaceDescriptor();

        console.log("Model warmed up successfully");
      } catch (error) {
        console.error("Error during model warm-up:", error);
      }
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  useEffect(() => {
    let stream;
    let cleanupDetection;

    if (modelsLoaded && openModal) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((videoStream) => {
          stream = videoStream;
          if (videoRef.current) {
            videoRef.current.srcObject = videoStream;

            // Start detection after video metadata is loaded
            videoRef.current.onloadedmetadata = () => {
              videoRef.current.play();
              cleanupDetection = startAutomaticDetection(); // Start interval-based detection
            };
          }
        })
        .catch((err) => {
          console.error("Error accessing webcam:", err);
        });
    }

    return () => {
      // Stop the video stream and clear detection interval when modal is closed
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (cleanupDetection) {
        cleanupDetection();
      }
    };
  }, [modelsLoaded, openModal]);

  const isLoadingRef = useRef(false); // Ref to track loading state

  const startAutomaticDetection = () => {
    let lastFrame = null;
    let motionDetected = false;
    let motionTimer = null; // Timer for no-motion detection
    const noMotionDuration = 1000; // Time in ms to wait after no motion

    // Start a loop for continuous frame processing
    const processFrame = () => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        // Ensure canvas dimensions match video dimensions
        if (video.videoWidth && video.videoHeight) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          // Draw the current video frame onto the canvas
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
      }

      // Continue the frame processing loop
      if (openModal) {
        requestAnimationFrame(processFrame);
      }
    };

    // Start the frame processing loop
    requestAnimationFrame(processFrame);

    // Set up interval for motion detection
    const intervalId = setInterval(() => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        // Get the current frame for motion detection
        const currentFrame = context.getImageData(0, 0, canvas.width, canvas.height);

        if (currentFrame) {
          if (!lastFrame) {
            console.log("Initializing last frame");
            lastFrame = currentFrame;
          } else {
            console.log("Comparing frames for motion detection");
            if (isMotionDetected(lastFrame, currentFrame, motionThreshold)) {
              console.log("Motion detected");
              motionDetected = true;

              // Reset the no-motion timer
              if (motionTimer) {
                clearTimeout(motionTimer);
                motionTimer = null;
              }
            } else {
              console.log("No motion detected");

              // If no motion is detected and no timer is active, start the timer
              if (!motionDetected && !motionTimer) {
                motionTimer = setTimeout(() => {
                  console.log("No significant motion for the required duration. Triggering face detection...");
                  if (!isLoadingRef.current) {
                    isLoadingRef.current = true;
                    setIsLoading(true);
                    detectAndCaptureFace().then(() => {
                      isLoadingRef.current = false; // Reset loading state synchronously
                      setIsLoading(false); // Update React state
                    });
                  }
                }, noMotionDuration);
              }
            }

            // Update the motion state and last frame after comparison
            motionDetected = false;
            lastFrame = currentFrame;
          }
        }
      }
    }, 200); // Adjust the interval (200ms for 5 checks per second)

    // Cleanup function to stop processing and detection
    return () => {
      clearInterval(intervalId);
      if (motionTimer) {
        clearTimeout(motionTimer);
      }
    };
  };

  const isMotionDetected = (lastFrame, currentFrame, threshold) => {
    let diff = 0;
    for (let i = 0; i < currentFrame?.data.length; i += 4) {
      const r = Math.abs(currentFrame?.data[i] - lastFrame?.data[i]);
      const g = Math.abs(currentFrame?.data[i + 1] - lastFrame?.data[i + 1]);
      const b = Math.abs(currentFrame?.data[i + 2] - lastFrame?.data[i + 2]);
      if (r + g + b > threshold) {
        diff++;
      }
    }
    return diff > 10000; // Adjust sensitivity by changing this value
  };

  const detectAndCaptureFace = async () => {
    const video = videoRef.current;
    const detections = await faceapi.detectSingleFace(video).withFaceLandmarks().withFaceDescriptor();

    if (detections) {
      setError();
      setSuccess("Wajah berhasil terdeteksi");
      await handleSubmit(detections.descriptor);
    } else {
      setSuccess();
      setError("Wajah tidak terdeteksi");
      isLoadingRef.current = false; // Reset loading state synchronously
      setIsLoading(false); // Update React state
    }
  };

  const handleSubmit = async (faceDescriptor) => {
    try {
      const response = await fetchAddPresence({ classes_id, meet_id, face: faceDescriptor }, token);

      toast.success(response.data.message);
      setShouldRefetch(true);
    } catch (e) {
      if (typeof e.response.data.message != "string") {
        Object.values(e.response.data.message).forEach((e) => {
          toast.error(e);
        });
      } else {
        toast.error(e.response.data.message);
      }
    }
  };
  const handleCloseModal = () => {
    setError();
    setSuccess();
    setOpenModal(false);
  };

  return (
    <>
      <button type="button" onClick={() => setOpenModal(true)} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded ml-6" disabled={!modelsLoaded}>
        {modelsLoaded ? "Deteksi wajah disini" : "Menyiapkan.."}
      </button>
      <Modal show={openModal} onClose={handleCloseModal} size="6xl">
        <Modal.Header>Deteksi Wajah</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col md:flex-row h-96">
            <div className="md:basis-1/2 mb-10">
              <div className="relative w-full min-h-52 max-h-96">
                <video ref={videoRef} autoPlay className="top-0 left-0 w-full invisible" />
                <canvas ref={canvasRef} className="absolute top-0 left-0 w-full bg-black" />
              </div>
            </div>
            <div className="md:basis-1/2 w-full flex flex-col justify-center items-center gap-y-4">
              {isLoading ? (
                <>
                  <p className="text-center text-green-500 font-bold">Memproses...</p>
                </>
              ) : (
                <>
                  {error && <p className="text-center text-red-500 font-bold">{error}</p>}
                  {!success && !error && <p className="text-center">Wajah akan otomatis terdeteksi ketika ada pergerakan.</p>}
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
