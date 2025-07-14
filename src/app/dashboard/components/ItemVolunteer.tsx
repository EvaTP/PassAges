"use client";
import Image from "next/image";
import { Volunteer } from "@/app/types/volunteers";
//import BlackButton from "@/BlackButton";

interface VolunteersProps {
  volunteer: Volunteer;
  onEdit: (volunteer: Volunteer) => void;
  onDelete: (volunteer: Volunteer) => void;
}

export default function ItemVolunteer({
  volunteer,
  onEdit,
  onDelete,
}: VolunteersProps): React.ReactNode {
  return (
    <>
      <div className="bg-white rounded-lg shadow-md h-full flex flex-col p-4 justify-start overflow-hidden w-full">
        <div className="flex flex-col space-y-1">
          <div>
            {/* 1. Firstname & LastName*/}
            <p className="text-black text-lg font-bold ml-3 mt-3">
              {volunteer.firstname} {volunteer.lastname}
            </p>
          </div>

          <div>
            {/* 2. Rôle */}
            <p className="text-sm px-2 py-1">
              {" "}
              <span className="font-semibold">Statut : </span> {volunteer.role}
            </p>
          </div>
          <div>
            {/* 3. Mot de passe */}
            <p className="text-sm px-2 py-1">
              {" "}
              <span className="font-semibold">Mot de passe : </span>{" "}
              {volunteer.password}
            </p>
          </div>
          {/* 4. Zipcode & City */}
          <p className="text-sm px-2 py-1">
            {" "}
            <span className="font-semibold">Ville : </span>
            {volunteer.zipcode || "code postal non renseigné"}{" "}
            {volunteer.cities?.city_name || "Ville non renseignée"}
          </p>

          {/* 5. Motivation */}
          <p className="text-sm mt-2 px-2 py-2 flex-grow">
            {" "}
            <span className="font-semibold">Sa motivation : </span>
            {volunteer.motivation}
          </p>

          {/* 6. Email */}
          <p className="text-sm mt-2 px-2 py-2 flex-grow">
            {" "}
            <span className="font-semibold">Email : </span> {volunteer.email}
          </p>

          {/* 7. Date de création */}
          <p className="text-sm mt-2 px-2 py-2 flex-grow">
            {" "}
            <span className="font-semibold">Création : </span>
            {volunteer.created_at instanceof Date
              ? volunteer.created_at.toLocaleDateString()
              : String(volunteer.created_at)}
          </p>

          {/* 8. Date de mise à jour */}
          <p className="text-sm mt-2 px-2 py-2 flex-grow">
            {" "}
            <span className="font-semibold">Mise à jour : </span>
            {volunteer.updated_at instanceof Date
              ? volunteer.updated_at.toLocaleDateString()
              : String(volunteer.updated_at)}
          </p>
        </div>

        <div className="flex flex-row justify-end gap-4">
          <button
            className="p-2 rounded-full bg-blue-100 hover:bg-blue-300"
            onClick={() => onEdit(volunteer)}
          >
            <Image
              src="icones/pen.svg"
              alt="icon-edit"
              width={25}
              height={25}
              priority
            />
          </button>
          <button
            className="p-2 rounded-full bg-red-100 hover:bg-red-300"
            onClick={() => onDelete(volunteer)}
          >
            <Image
              src="icones/trash-red.svg"
              alt="icon-delete"
              width={25}
              height={25}
              priority
            />
          </button>
        </div>
      </div>
    </>
  );
}
