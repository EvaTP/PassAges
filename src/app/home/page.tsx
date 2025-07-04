import Image from "next/image";
import Link from "next/link";
// import { useState, useEffect } from "react";
import { prisma } from "@/app/lib/prisma";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer/Footer";
import { getEldersPicture } from "@/app/actions/getEldersPicture";
import { HOW_IT_WORKS } from "@/app/data/cards";
import { ElderPicture } from "@/app/types/elders";
import BlackButton from "@/app/components/BlackButton";

export default async function Home() {
  const elders: ElderPicture[] = await getEldersPicture();

  return (
    <>
      {/* <Header /> */}
      <main className="p-6 bg-gray-50 mt-20">
        <div className="mx-auto w-[80%]">
          {/* BENTO GRID */}

          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[200px] gap-3">
            {elders.slice(0, 8).map((elder, index) => {
              let gridClasses = "";
              switch (index) {
                case 0:
                  gridClasses = "col-start-1 row-span-2";
                  break;
                case 1:
                  gridClasses = "col-start-1 row-start-3";
                  break;
                case 2:
                  gridClasses = "col-start-2 row-start-1";
                  break;
                case 3:
                  gridClasses = "col-start-2 row-span-2 row-start-2";
                  break;
                case 4:
                  gridClasses = "col-start-3 row-span-2";
                  break;
                case 5:
                  gridClasses = "col-start-3 row-start-3";
                  break;
                case 6:
                  gridClasses = "col-start-4 row-start-1";
                  break;
                case 7:
                  gridClasses = "col-start-4 row-span-2";
                  break;
                default:
                  break;
              }
              return (
                <div
                  key={elder.id}
                  className={`overflow-hidden rounded-sm w-full h-full ${gridClasses}`}
                >
                  {elder.picture ? (
                    <Image
                      src={elder.picture}
                      alt={`Photo de l'aîné #${elder.id}`}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full rounded-sm"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-sm">
                      <span className="text-gray-600 text-sm">Pas d'image</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-rose-50 p-6 mt-20">
          <h2 className="text-center text-2xl font-bold mb-2">
            COMMENT CA MARCHE
          </h2>
          <p className="text-center mt-2 mb-15">
            Offrir un peu de votre temps, c'est offrir beaucoup. Découvrez
            comment planifier une visite en toute simplicité.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((w, index) => (
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

        <div>
          <h2 className="text-center text-2xl font-bold mb-2">
            PRÊT⸱E À FAIRE LA DIFFÉRENCE ?
          </h2>
          <p>
            Offrez un peu de votre temps, partagez un moment, créez du lien...
            Chaque présence compte. En tendant la main à une personne âgée, vous
            lui offrez bien plus qu'une visite : une vraie bouffée de chaleur
            humaine.
          </p>
          <div id="btn-CTA">
            <BlackButton label="Programmer une visite" />
            <button className="black">Programmer une visite</button>
            <button className="violet">Faire un don 🫶</button>
            <button className="yellow">Devenir bénévole</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
