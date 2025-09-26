"use client";
import MomentType from "./MomentType";
import ChooseCity from "./ChooseCity";
import BlackButton from "./BlackButton";
// import { useContext } from "react";
// import Authentication from "./Authentication";
import { useState } from "react";

export default function MomentToShare(): React.ReactNode {
  // On doit créer le tableau avec les éléments de la liste déroulantes en premier
  const [city, setCity] = useState("");
  const [activity, setActivity] = useState("");

  const moments = [
    { label: "-- Choisissez un moment --", value: "moment" },
    { label: "Un café/thé", value: " café/thé" },
    { label: "Un repas", value: "repas" },
    { label: "Une promenade", value: " promenade" },
    { label: "Une sortie culturelle", value: "sortie" },
    { label: "Un cinéma", value: " cinéma" },
    { label: "Autre activité", value: "autres" },
  ];
  return (
    <section className="flex justify-center -mt-16 z-10">
      <div className="bg-white flex flex-row justify-center content-between gap-15 p-6 rounded-sm w-[80%] shadow-[8px_8px_0_rgba(0,0,0,0.20)]">
        <MomentType
          label="Moments à partager"
          moments={moments}
          onChange={(activity: string) => {
            console.log("Moment sélectionné: " + activity);
            setActivity(activity);
          }}
        />
        <br></br>
        <ChooseCity
          label="Localisation"
          onChange={(city: string) => {
            console.log("Ville séléctionnée: " + city);
            setCity(city);
          }}
        />
        <div className="mt-5">
          {/* On envois avec le lien du bouton la ville et le moment sélectionnés */}
          <a href={`/visit?city=${city}&activity=${activity}`}>
            <BlackButton label="Rechercher &nbsp;&nbsp;🔍" />
          </a>
        </div>
      </div>
    </section>
  );
}
