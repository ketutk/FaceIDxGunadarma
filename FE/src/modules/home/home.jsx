import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import ketut from "../../assets/ketut.png";
import vito from "../../assets/vito.png";
import caca from "../../assets/caca.png";
import arva from "../../assets/arva.png";
import samuel from "../../assets/samuel.png";
import { useState } from "react";

const Home = () => {
  const [isTeamSection, setIsTeamSection] = useState(false);

  const teamMembers = [
    {
      name: "Shabrina Nazla Sujaya",
      role: "Project Manager",
      npm: "11121206",
      image: caca,
    },
    {
      name: "Septian Indra Vito",
      role: "Design System",
      npm: "11121200",
      image: vito,
    },
    {
      name: "I Ketut Krisna Kertajaya",
      role: "Developer",
      npm: "10121571",
      image: ketut, // placeholder image
    },
    {
      name: "Samuel Alexander",
      role: "Quality Assurance",
      npm: "11121182",
      image: samuel,
    },
    {
      name: "Rizky Arva Ardana",
      role: "Dokumentasi",
      npm: "11121148",
      image: arva,
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-800 flex justify-center items-center rounded">
        <img src={logo} alt="logo gunadarma" className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-30" />

        {!isTeamSection && (
          <div className="px-6 py-20 bg-black bg-opacity-30 flex flex-col gap-y-4 z-50 mx-4 overflow-x-hidden">
            <h1 className="font-bold text-3xl text-white text-center lg:transform-none animate-marquee lg:animate-none whitespace-nowrap">KAMI MENGUCAPKAN SELAMAT DATANG DI PROJECT KULIAH KAMI</h1>
            <h2 className="font-bold text-3xl text-white text-center">KOMUG X GUNADARMA</h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">
              <Link to={"/login"}>
                <button className="px-4 py-2 outline outline-white text-center rounded hover:bg-purple-600 text-white text-2xl font-bold">LOGIN KE WEBSITE</button>
              </Link>
              <button className="px-4 py-2 bg-white text-center rounded hover:bg-purple-600 hover:text-white text-2xl font-bold" onClick={() => setIsTeamSection(true)}>
                LIHAT TIM KAMI
              </button>
            </div>
          </div>
        )}

        {isTeamSection && (
          <div className="z-50 px-4 py-8 w-full max-w-6xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Our Team</h2>
              <button onClick={() => setIsTeamSection(false)} className="px-4 py-2 text-white outline outline-white rounded hover:bg-purple-600">
                Back
              </button>
            </div>

            <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex-shrink-0 snap-center w-72 bg-white rounded-lg shadow-xl overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-56 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                    <p className="text-purple-600 font-semibold">{member.role}</p>
                    <p className="text-gray-600">NPM: {member.npm}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-marquee {
          animation: marquee 15s linear infinite;
        }

        @media (min-width: 768px) {
          .animate-marquee {
            animation: none;
          }
        }

        /* Custom scrollbar styling */
        .overflow-x-auto {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.5) transparent;
        }

        .overflow-x-auto::-webkit-scrollbar {
          height: 6px;
        }

        .overflow-x-auto::-webkit-scrollbar-track {
          background: transparent;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 6px;
        }
      `}</style>
    </>
  );
};

export default Home;
