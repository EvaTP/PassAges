"use client";
import Image from "next/image";
import { Volunteer } from "@/app/types/volunteers";
import BlueButton from "@/app/components/BlueButton";
import BlackButton from "@/app/components/BlackButton";

interface VolunteersProps {
  volunteer: Volunteer;
  onAccept: (volunteer: Volunteer) => void;
  onDeny: (volunteer: Volunteer) => void;
}

export default function VolunteerOnhold({
  volunteer,
  onAccept,
  onDeny,
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

          {/* 2. Zipcode & City */}
          <p className="text-sm px-2 py-1">
            {" "}
            <span className="font-semibold">Ville : </span>
            {volunteer.zipcode || "code postal non renseigné"}{" "}
            {volunteer.cities?.city_name || "Ville non renseignée"}
          </p>

          {/* 3. Motivation */}
          <p className="text-md mt-2 px-2 py-2 flex-grow">
            {" "}
            <span className="font-semibold">Sa motivation : </span>
            {volunteer.motivation}
          </p>

          {/* 4. Email */}
          <p className="text-sm mt-2 px-2 py-2 flex-grow">
            {" "}
            <span className="font-semibold">Email : </span> {volunteer.email}
          </p>
        </div>

        {/* 5. Volunteer management buttons */}
        <div className="flex flex-row justify-end gap-4">
          <BlueButton
            label="Accepter le candidat ✅"
            onClick={() => onAccept(volunteer)}
          />

          <BlackButton
            label="Refuser le candidat ⛔️"
            onClick={() => onDeny(volunteer)}
          />
        </div>
      </div>
    </>
  );
}
