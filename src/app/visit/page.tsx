import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import ElderCard from "@/app/components/ElderCard";
import MomentToShare from "@/app/components/MomentToShare";
import { ElderWithRelations } from "@/app/components/ElderCard";

const VisitParams = async ({
  searchParams,
}: {
  searchParams?: {
    activity?: string;
    city?: string;
  };
}) => {
  const city = searchParams?.city || "";
  console.log(city);

  const activity = searchParams?.activity || "";
  console.log(activity);

  //Appel avec l'espace de noms Prisma
  const filters: Prisma.eldersWhereInput = {};

  if (city) {
    filters.cities = {
      city_name: {
        contains: city,
        mode: "insensitive",
      },
    };
  }

  if (activity) {
    filters.activities = {
      activity_type: {
        contains: activity,
        mode: "insensitive",
      },
    };
  }

  const elders = (await prisma.elders.findMany({
    where: filters,
    include: {
      cities: true,
      activities: true,
    },
  })) as ElderWithRelations[];

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
      {/* Moments à partager*/}
      <div>
        <MomentToShare />
      </div>
      <main className="p-6 bg-gray-50">
        <div className="mx-auto">
          <h1>Je rends visite</h1>

          {/* Affichage de tous les elders */}
          <div className="w-4/5 mx-auto grid grid-cols-4 gap-2.5">
            {elders.map((elder) => (
              <ElderCard key={elder.id} elder={elder} />
            ))}
          </div>

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
