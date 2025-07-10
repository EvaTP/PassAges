import Image from "next/image";
import Link from "next/link";
import Authentication from "../components/Authentication";
import { prisma } from "@/lib/prisma";
//import { useState } from "react";
import BlackButton from "@/app/components/BlackButton";
import ElderCard from "@/app/components/ElderCard";
import { searchVisitElders } from "../actions/getEldersPicture";

const VisitParams = async ({
  searchParams,
}: {
  searchParams?: {
    activity?: string;
    city?: string;
  };
}) => {
  const city = (await searchParams)?.city || "";
  console.log(city);

  const activity = (await searchParams)?.activity || "";
  console.log(activity);

 //Appel avec prisma

 const filters: any = {};

if (city) {
  filters.cities = {
    city_name: {
      contains: city,
      mode: 'insensitive',
    },
  };
}

if (activity) {
  filters.activities = {
    activity_type: {
      contains: activity,
      mode: 'insensitive',
    },
  };
}

const elders = await prisma.elders.findMany({
  where: filters,
  include: {
    cities: true,
    activities: true,
  },

  
});

if (elders.length === 0) {
  if (city && activity) {
    console.log(`Aucun résultat trouvé pour la ville "${city}" et l'activité "${activity}".`);
  } else if (city) {
    console.log(`Aucun résultat trouvé pour la ville "${city}".`);
  } else if (activity) {
    console.log(`Aucun résultat trouvé pour l'activité "${activity}".`);
  } else {
    console.log("Aucun résultat trouvé.");
  }
}



  return (
    <>
      <div className="">
        <Image
          className="w-full h-[290px] object-cover"
          src="/images/hero-desktop-visiter.svg"
          alt="hero-image"
          width={180}
          height={50}
          priority
        />
      </div>
      <main className="p-6 bg-gray-50">
        <div className="mx-auto">
          <h1>Je rends visite</h1>
          
            {elders.length === 0 ? (
                <div>
                  <p className="text-[30px] text-red-600">
                    <strong>Aucun résultat trouvé 😥😥😥</strong>
                  </p>
                  <a href="/home" className="text-[20px] text-blue-500 underline">
                    Réessayer
                  </a>
                </div>
              ) : (
                <div>
                  {/* Affichage de tous les elders */}
                  <div className="w-4/5 mx-auto grid grid-cols-4 gap-2.5">
                    {elders.map((elder) => (
                      <ElderCard key={elder.id} elder={elder} />
                    ))}
                  </div>
                </div>
              )}


          

          {/* Message si aucun elder */}
          {/* {elders.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              Aucune visite disponible pour le moment.
            </p>
          )} */}
        </div>
      </main>
    </>
  );
};
export default VisitParams;
