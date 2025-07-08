"use client";
import Image from "next/image";
import BlackButton from "./BlackButton";

// Type pour les données d'un elder avec ses relations
type ElderWithRelations = {
  id: number;
  firstname: string;
  lastname: string;
  age: number | null;
  job: string | null;
  description: string | null;
  picture: string | null;
  cities: {
    city_name: string;
  } | null;
  activities: {
    activity_type: string;
  } | null;
};

interface ElderCardProps {
  elder: ElderWithRelations;
}

export default function ElderCard({ elder }: ElderCardProps): React.ReactNode {
  return (
    <div className="bg-white rounded-lg shadow-md h-full flex flex-col justify-start overflow-hidden">
      {/* 1. Picture */}
      {elder.picture && (
        <Image
          src={elder.picture}
          alt={`Photo de ${elder.firstname}`}
          width={400}
          height={300}
          className="h-2/5 w-full object-cover object-top rounded-t-lg"
        />
      )}

      {/* 2. Activity */}
      <p className="font-bold text-center mx-1 mt-10 mb-1 text-md px-2">
        {elder.activities?.activity_type || "Aucune activité"}
      </p>

      {/* 3. Firstname */}
      <h2 className="text-pink-500 text-base font-bold ml-3 mt-1">
        {elder.firstname}
      </h2>

      {/* 4. Job & Age */}
      <p className="text-sm px-2 py-1">
        {elder.job || "Profession non renseignée"} ●{" "}
        {elder.age ? `${elder.age} ans` : "Âge non renseigné"}
      </p>

      {/* 5. City */}
      <p className="text-sm px-2 py-1">
        {elder.cities?.city_name || "Ville non renseignée"}
      </p>

      {/* 6. Description */}
      <p className="text-sm mt-2 px-2 py-2 flex-grow">
        {elder.description || "Aucune description"}
      </p>

      {/* 7. Bouton "programmer un moment" */}
      <BlackButton label="Programmer un moment" />
      {/* <BlackButton/> */}
    </div>
  );
}
