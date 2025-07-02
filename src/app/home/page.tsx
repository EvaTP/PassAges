import Image from "next/image";
import Link from "next/link";
// import { useState, useEffect } from "react";
import { prisma } from "@/app/lib/prisma";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer/Footer";
import { getEldersPicture } from "@/app/actions/getEldersPicture";
import { HOW_IT_WORKS } from "@/app/data/cards";
import { ElderPicture } from "@/app/types/elders";

export default async function Home() {
  const elders: ElderPicture[] = await getEldersPicture();

  return (
    <>
      <Header />
      <main className="p-6 md:w-3/5 md:px-28 md:py-12 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {elders.map((elder) => (
            <div
              key={elder.id}
              className="rounded shadow p-4 flex flex-col items-center"
            >
              {elder.picture ? (
                <Image
                  src={elder.picture}
                  alt={`Photo de l'aîné #${elder.id}`}
                  width={200}
                  height={200}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-[200px] h-[200px] bg-gray-200 flex items-center justify-center rounded-full">
                  <span className="text-gray-600 text-sm">Pas d'image</span>
                </div>
              )}
            </div>
          ))}
          {HOW_IT_WORKS.map((w) => (
            <div key={w.text}>{w.text}</div>
          ))}
          ;
        </div>
      </main>
      <Footer />
    </>
  );
}

// export const  = async () => {
//   "use server"
//   try {
//     const questions = await prisma.question.findMany({
//       include: {
//         images: {

//         },

//       },
//     });
//     return questions;
//   } catch (error) {
//     console.error('Error fetching questions data:', {
//       message: error.message,
//       stack: error.stack,
//     });
//   }
// };

// export default function Home(): React.ReactNode {
//   const [data, setData] = useState<Elder[] | null>(null);
//   const [eldersData, setEldersData] = useState<any[] | null>(null);
//   const [isLoading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         // Récupération des elders depuis votre API
//         const eldersResponse = await fetch("http://localhost:3004/elders");
//         if (!eldersResponse.ok) {
//           throw new Error(`Erreur HTTP: ${eldersResponse.status}`);
//         }
//         const eldersData: Elder[] = await eldersResponse.json();
//         setData(eldersData);

//         // Récupération des pictures depuis Prisma
//         const picturesData = await getEldersPicture();
//         setEldersData(picturesData);

//         console.log("Elders:", eldersData);
//         console.log("Pictures:", picturesData);

//       } catch (err: any) {
//         console.error("Erreur lors du chargement des données:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Erreur: {error}</p>;
//   if (!data) return <p>No profile data</p>;

//   return (
//     <>
//       <Header />

//       <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
//         {/* Add Hero Images Here */}

//         <main className="main">
//           <div className="container">
//             <div className="grid">
//               {data.map((elder: Elder) => (
//                 <Elder key={elder.firstname} elder={elder} />
//               ))}
//             </div>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// }
