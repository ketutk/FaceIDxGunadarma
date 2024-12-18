// export function FaceModalPresensi() {
//   const videoRef = useRef();
//   const canvasRef = useRef();
//   const [openModal, setOpenModal] = useState(false);
//   const [success, setSuccess] = useState();
//   const [error, setError] = useState();
//   const [modelsLoaded, setModelsLoaded] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [faceDescriptor, setFaceDescriptor] = useState();
//   // const [lastFrame, setLastFrame] = useState(null); // For storing the last frame
//   const motionThreshold = 30; // Threshold for detecting significant motion

//   useEffect(() => {
//     const loadModels = async () => {
//       const MODEL_URL = "/models";

//       await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
//       await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
//       await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
//       setModelsLoaded(true);
//     };
//     loadModels();
//   }, []);

//   useEffect(() => {
//     let stream;

//     if (modelsLoaded && openModal) {
//       navigator.mediaDevices
//         .getUserMedia({ video: true })
//         .then((videoStream) => {
//           stream = videoStream;
//           if (videoRef.current) {
//             videoRef.current.srcObject = videoStream;
//             // Start automatic detection after video metadata is loaded
//             videoRef.current.onloadedmetadata = () => {
//               videoRef.current.play();
//               startAutomaticDetection();
//             };
//           }
//         })
//         .catch((err) => {
//           console.error("Error accessing webcam:", err);
//         });
//     }

//     return () => {
//       // Stop the video stream if the modal is closed
//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, [modelsLoaded, openModal]);

//   const isLoadingRef = useRef(false); // Ref to track loading state

//   const startAutomaticDetection = async () => {
//     let lastFrame = null;
//     const detect = async () => {
//       if (videoRef.current && canvasRef.current) {
//         const video = videoRef.current;
//         const canvas = canvasRef.current;
//         const context = canvas.getContext("2d");

//         // Ensure canvas dimensions match video dimensions
//         if (video.videoWidth && video.videoHeight) {
//           canvas.width = video.videoWidth;
//           canvas.height = video.videoHeight;

//           context.drawImage(video, 0, 0, canvas.width, canvas.height);
//           const currentFrame = context.getImageData(0, 0, canvas.width, canvas.height);

//           // Detect motion by comparing frames
//           if (currentFrame) {
//             if (!lastFrame) {
//               console.log("Initializing last frame");
//               lastFrame = currentFrame;
//             } else {
//               console.log("Comparing frames for motion detection");
//               if (isMotionDetected(lastFrame, currentFrame, motionThreshold) && !isLoadingRef.current && !isLoading) {
//                 console.log("Motion detected");
//                 isLoadingRef.current = true;
//                 setIsLoading(true);
//                 // await detectAndCaptureFace();
//               }

//               // Update lastFrame after detection
//               lastFrame = currentFrame;
//             }
//           }

//           // // Save current frame as last frame for next comparison
//           // lastFrame = currentFrame;
//         }
//       }

//       if (openModal && !isLoading) {
//         requestAnimationFrame(detect);
//       }
//     };
//     detect();
//   };

//   const isMotionDetected = (lastFrame, currentFrame, threshold) => {
//     let diff = 0;
//     for (let i = 0; i < currentFrame?.data.length; i += 4) {
//       const r = Math.abs(currentFrame?.data[i] - lastFrame?.data[i]);
//       const g = Math.abs(currentFrame?.data[i + 1] - lastFrame?.data[i + 1]);
//       const b = Math.abs(currentFrame?.data[i + 2] - lastFrame?.data[i + 2]);
//       if (r + g + b > threshold) {
//         diff++;
//       }
//     }
//     return diff > 10000; // Adjust sensitivity by changing this value
//   };

//   const detectAndCaptureFace = async () => {
//     const video = videoRef.current;
//     const detections = await faceapi.detectSingleFace(video).withFaceLandmarks().withFaceDescriptor();

//     if (detections) {
//       setFaceDescriptor(detections.descriptor);
//       setError();
//       toast.success("Wajah berhasil terdeteksi");
//       setTimeout(() => {
//         handleCloseModal();
//         isLoadingRef.current = false; // Reset loading state synchronously
//         setIsLoading(false); // Update React state
//       }, 2000);
//     } else {
//       setSuccess();
//       setError("Wajah tidak terdeteksi");
//       isLoadingRef.current = false; // Reset loading state synchronously
//       setIsLoading(false); // Update React state
//     }
//   };

//   const handleCloseModal = () => {
//     setError();
//     setSuccess();
//     setOpenModal(false);
//   };

//   return (
//     <>
//       <button type="button" onClick={() => setOpenModal(true)} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded ml-6" disabled={!modelsLoaded}>
//         {modelsLoaded ? "Deteksi wajah disini" : "Menyiapkan.."}
//       </button>
//       <Modal show={openModal} onClose={handleCloseModal} size="6xl">
//         <Modal.Header>Deteksi Wajah</Modal.Header>
//         <Modal.Body>
//           <div className="flex flex-col md:flex-row h-96">
//             <div className="md:basis-1/2 mb-10">
//               <div className="relative w-full min-h-52 max-h-96">
//                 <video ref={videoRef} autoPlay className="absolute top-0 left-0 w-full" />
//                 <canvas ref={canvasRef} className="absolute top-0 left-0 w-full bg-black" />
//               </div>
//             </div>
//             <div className="md:basis-1/2 w-full flex flex-col justify-center items-center gap-y-4">
//               {isLoading ? (
//                 <>
//                   <p className="text-center text-green-500 font-bold">Memproses...</p>
//                 </>
//               ) : (
//                 <>
//                   {error && <p className="text-center text-red-500 font-bold">{error}</p>}
//                   {!success && !error && <p className="text-center">Wajah akan otomatis terdeteksi ketika ada pergerakan.</p>}
//                 </>
//               )}
//             </div>
//           </div>
//         </Modal.Body>
//         <Modal.Footer></Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// const startAutomaticDetection = () => {
//     let lastFrame = null;
//     const intervalId = setInterval(async () => {
//       if (videoRef.current && canvasRef.current) {
//         const video = videoRef.current;
//         const canvas = canvasRef.current;
//         const context = canvas.getContext("2d");

//         // Ensure canvas dimensions match video dimensions
//         if (video.videoWidth && video.videoHeight) {
//           canvas.width = video.videoWidth;
//           canvas.height = video.videoHeight;

//           // Clone the current frame for processing
//           context.drawImage(video, 0, 0, canvas.width, canvas.height);
//           const currentFrame = context.getImageData(0, 0, canvas.width, canvas.height);

//           if (currentFrame) {
//             if (!lastFrame) {
//               console.log("Initializing last frame");
//               lastFrame = currentFrame;
//             } else {
//               console.log("Comparing frames for motion detection");
//               if (isMotionDetected(lastFrame, currentFrame, motionThreshold) && !isLoadingRef.current) {
//                 console.log("Motion detected");
//                 isLoadingRef.current = true;
//                 setIsLoading(true);
//                 await detectAndCaptureFace();
//               } else {
//                 console.log("No motion detected");
//               }

//               // Update lastFrame after detection
//               lastFrame = currentFrame;
//             }
//           }
//         }
//       }
//     }, 200); // Adjust the interval (200ms for 5 checks per second)

//     // Cleanup the interval when the modal is closed
//     return () => clearInterval(intervalId);
//   };
