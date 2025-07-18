"use client";
import Image from "next/image";
import VolunteerForm from "@/app/components/VolunteerForm";
import Cookies from "js-cookie"; //npm install --save-dev @types/js-cookie pour que ça fonctionne en typescript
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";


// Rubrique "Pourquoi devenir bénévole"
import { WHY_VOLUNTEER } from "@/app/data/cards";



export default function Volunteers() {
  
  const [volunteer, setVolunteer] = useState<string | null>(null);

  useEffect(() => {
    const storedName = Cookies.get("volunteer"); // lecture du cookie
    setVolunteer(storedName ?? null);
  }, []);

  return (
    <>
      <div className="">
        <Image
          className="w-full h-[290px] object-cover"
          src="/images/hero-devenir-benevole.svg"
          alt="hero-image"
          width={180}
          height={50}
          priority
        />
        <VolunteerForm />
      </div>

      <div>
        <div className="bg-rose-50 mt-5 mb-15 p-6">
          <h2 className="text-center text-2xl font-bold mb-2">
            POURQUOI DEVENIR BÉNÉVOLE ?
          </h2>
          <p className="text-center mt-2 mb-15 text-xl">
            Être bénévole chez Pass<span className="text-pink-500">Ages</span>,
            c'est bien plus qu'une simple activité.
            <br></br>
            C'est une expérience enrichissante qui apporte du sens à votre vie
            et à celle des autres.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {WHY_VOLUNTEER.map((w, index) => (
              <div
                key={w.title || index}
                className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
              >
                <span className="text-4xl mb-2">{w.emoji}</span>
                <h3 className="">{w.title}</h3>
                <p className="text-sm text-gray-600">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
