import Image from "next/image";
import { getEldersPicture } from "@/app/actions/getEldersPicture";
import { HOW_IT_WORKS } from "@/app/data/cards";
import { ElderPicture } from "@/app/types/elders";
import MomentToShare from "../components/MomentToShare";
import BlackButton from "@/app/components/BlackButton";
import BlueButton from "@/app/components/BlueButton";
import YellowButton from "@/app/components/YellowButton";

export default async function Home() {
  const elders: ElderPicture[] = await getEldersPicture();

  return (
    <>
      <div className="">
        <Image
          className="w-full h-[290px] object-cover"
          src="/images/hero-desktop.svg"
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

      <main className="p-6 bg-gray-50 mt-10">
        <h1>LES PERSONNALITÉS À RENCONTRER</h1>
        <p className="text-center mt-1 mb-5 text-2xl">
          Feuilletez les visages de celles et ceux qui attendent simplement un
          peu de votre temps. <br />
          Chaque sourire porte une histoire, chaque rencontre est une promesse.
        </p>
        <div className="mx-auto w-[80%] mt-10">
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
                      alt={`Photo aîné #${elder.id}`}
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
          <p className="text-center mt-2 mb-15 text-xl">
            Offrir un peu de votre temps, c'est offrir beaucoup.<br></br>
            Découvrez comment planifier une visite en toute simplicité.
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
          <h2 className="text-center text-2xl font-bold mb-4 mt-8">
            PRÊT⸱E À FAIRE LA DIFFÉRENCE ?
          </h2>
          <p className="text-center mb-4">
            Offrez un peu de votre temps, partagez un moment, créez du lien...
            Chaque présence compte. <br />
            En tendant la main à une personne âgée, vous lui offrez bien plus
            qu'une visite : une vraie bouffée de chaleur humaine.
          </p>
          <div className=" flex flex-row mt-10 mb-5 gap-6 content-center">
            <BlackButton label="Programmer une visite" />
            <BlueButton label="Faire un don 🫶" />
            <YellowButton label="Devenir bénévole" />
          </div>
        </div>
      </main>
    </>
  );
}
