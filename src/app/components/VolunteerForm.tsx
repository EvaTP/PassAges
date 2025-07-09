"use client";
import Image from "next/image";
import BlueButton from "@/app/components/BlueButton";
import YellowButton from "./YellowButton";

export default function VolunteerForm() {
  return (
    <>
      <div className="p-4">
        <form
          className="flex flex-col gap-6 mt-6 mb-6 p-6 bg-white rounded-2xl shadow-md max-w-xl mx-auto"
          action="index.html"
          method="GET"
          target="_blank"
          noValidate
        >
          <h2 className="text-center text-2xl font-semibold text-gray-800">
            FORMULAIRE D'INSCRIPTION
          </h2>

          <p className="text-gray-600 text-sm text-center">
            Remplissez ce formulaire pour rejoindre notre réseau de bénévoles.
            Nous vous contacterons rapidement pour vous présenter les prochaines
            étapes.
          </p>

          {/* Prénom */}
          <div className="flex flex-col">
            <label htmlFor="prenom" className="text-gray-700 font-medium">
              Prénom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="prenom"
              id="prenom"
              placeholder="Votre prénom"
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <div className="error invisible text-sm text-red-500">
              Ce champ est obligatoire.
            </div>
          </div>

          {/* Nom */}
          <div className="flex flex-col">
            <label htmlFor="nom" className="text-gray-700 font-medium">
              Nom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nom"
              id="nom"
              placeholder="Votre nom"
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <div className="error invisible text-sm text-red-500">
              Ce champ est obligatoire.
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-medium">
              Adresse email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="exemple@gmail.com"
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <div className="error invisible text-sm text-red-500">
              Ce champ est obligatoire.
            </div>
          </div>

          {/* Ville */}
          <div className="flex flex-col">
            <label htmlFor="ville" className="text-gray-700 font-medium">
              Ville <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="ville"
              id="ville"
              placeholder="Votre ville"
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <div className="hidden text-sm text-red-500">
              Ce champ est obligatoire.
            </div>
          </div>

          {/* Code postal */}
          <div className="flex flex-col">
            <label htmlFor="cp" className="text-gray-700 font-medium">
              Code postal <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="cp"
              id="cp"
              placeholder="Code postal"
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <div className="hidden text-sm text-red-500">
              Ce champ est obligatoire.
            </div>
          </div>

          {/* Disponibilités */}
          <div className="flex flex-col">
            <label htmlFor="moment-dispo" className="text-gray-700 font-medium">
              Disponibilités <span className="text-red-500">*</span>
            </label>
            <select
              name="dispos"
              id="moment-dispo"
              required
              className="border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">-- Sélectionnez vos disponibilités --</option>
              <option value="matin">Le matin</option>
              <option value="midi">Le midi</option>
              <option value="amidi">L'après-midi</option>
              <option value="soiree">En soirée</option>
            </select>
            <div className="hidden text-sm text-red-500">
              Ce champ est obligatoire.
            </div>
          </div>

          {/* Motivation */}
          <div className="flex flex-col">
            <label htmlFor="motivation" className="text-gray-700 font-medium">
              Votre motivation <span className="text-red-500">*</span>
            </label>
            <textarea
              name="motivation"
              id="motivation"
              placeholder="Parlez-nous de votre motivation à devenir bénévole chez Adaence..."
              required
              className="border border-gray-300 rounded-md p-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <div className="hidden text-sm text-red-500">
              Ce champ est obligatoire.
            </div>
          </div>

          <p className="text-sm text-gray-500">
            <span className="text-red-500">*</span> champs obligatoires
          </p>

          <div className="flex justify-center">
            <YellowButton label="Envoyer ma candidature" />
          </div>
        </form>

        {/* <form
          className="flex flex-col mt-3 mb-3 rounded-2xl"
          action=""
          method="GET"
          target="_blank"
          novalidate
        >
          <h2 className="text-center">FORMULAIRE D'INSCRIPTION</h2>
          <p className="p-4">
            Remplissez ce formulaire pour réjoindre notre réseau de bénévoles.
            Nous vous contacterons rapidement pour vous présenter les prochaines
            étapes.
          </p>
          <div className="flex flex-col m-4 p-2 place-content-center gap-4">
            <div className="flex flex-col">
              <label htmlFor="prenom" required>
                Prénom <span>*</span>
              </label>
              <input type="text" name="prenom" placeholder="Votre prénom" />
              <div className="error invisible">Ce champ est obligatoire.</div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="nom" required>
                Nom <span>*</span>
              </label>
              <input type="text" name="nom" placeholder="Votre nom" />
              <div className="error invisible">Ce champ est obligatoire.</div>
            </div>
          </div>
          <div className="">
            <div className="flex flex-col">
              <label htmlFor="email" required>
                Adresse email <span>*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="exemple@gmail.com"
              />
              <div className="error invisible">Ce champ est obligatoire.</div>
            </div>
          </div>
          <div className="">
            <div className="flex flex-col">
              <label htmlFor="ville">
                Ville <span>*</span>
              </label>
              <input
                type="text"
                name="ville"
                required
                placeholder="Votre ville"
              />
              <div className="error invisible">Ce champ est obligatoire.</div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="cp">
                Code postal <span>*</span>
              </label>
              <input type="text" name="cp" required placeholder="Code postal" />
              <div className="error invisible">Ce champ est obligatoire.</div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="form-groupPage3 disponibilites">
              <label htmlFor="dispos">
                Disponibilités <span>*</span>
              </label>
              <select name="dispos" required id="moment-dispo">
                <option value="">-- Sélectionnez vos disponibilités --</option>
                <option value="matin">Le matin</option>
                <option value="midi">Le midi</option>
                <option value="amidi">L'après-midi</option>
                <option value="soiree">En soirée</option>
              </select>
              <div className="text-sm">Ce champ est obligatoire.</div>
            </div>
          </div>
          <div className="">
            <div className="flex flex-col">
              <label htmlFor="motivation">
                Votre motivation <span>*</span>
              </label>
              <textarea
                name="motivation"
                required
                id="motivation"
                placeholder="Parlez-nous de votre motivation à devenir bénévole chez Adaence..."
              ></textarea>
              <div className="error invisible">Ce champ est obligatoire.</div>
            </div>
          </div>
          <p>
            <span>*</span> champs obligatoires
          </p>
          <YellowButton label="Envoyer ma candidature" /> ;
          <button type="submit" id="btn-volunteer" className="yellow">
            Envoyer ma candidature
          </button>
        </form> */}
      </div>
    </>
  );
}
