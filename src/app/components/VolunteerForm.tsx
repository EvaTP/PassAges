"use client";
import { useEffect, useState, ChangeEvent } from "react";

//^ interfaces TypeScript
type VolunteerFormData = {
  firstname: string;
  lastname: string;
  email: string;
  city: string;
  zipcode?: string;
  motivation: string;
};

export default function VolunteerForm() {
  const [formData, setFormData] = useState<VolunteerFormData>({
    firstname: "",
    lastname: "",
    email: "",
    city: "",
    zipcode: "",
    motivation: "",
  });
  // Pour formulaire SELECT CITIES
  // type City = {
  //   id: number;
  //   city_name: string;
  // };
  // const [cities, setCities] = useState<City[]>([]);
  // changer les villes depuis l'API (formulaire SELECT)
  // useEffect(() => {
  //   const fetchCities = async () => {
  //     try {
  //       const res = await fetch("/api/cities");
  //       const result = await res.json();
  //       if (res.ok) {
  //         setCities(result.data);
  //       } else {
  //         console.error("Erreur lors du chargement des villes :", result.error);
  //       }
  //     } catch (error) {
  //       console.error("Erreur réseau lors du chargement des villes :", error);
  //     }
  //   };
  //   fetchCities();
  // }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/volunteersform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        alert(
          "Merci pour votre candidature. Nous reviendrons vers vous prochainement. 💖"
        );
        // Optionnel : reset du formulaire
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          city: "",
          zipcode: "",
          motivation: "",
        });
      } else {
        alert("Erreur : " + result.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-12 flex flex-col gap-4 mt-5 mb-6 p-6 z-10 bg-white rounded-2xl shadow-md max-w-xl mx-auto"
    >
      <div className="">
        <div className="border-b border-gray-900/10 pb-3">
          <h2 className="text-center text-base/7 font-semibold text-gray-900 mt-4">
            FORMULAIRE D'INSCRIPTION
          </h2>
          <p className="mt-3 text-center text-sm/6 text-gray-600">
            Remplissez ce formulaire pour rejoindre notre réseau de bénévoles.
            <br></br>
            Nous vous contacterons rapidement pour vous présenter les prochaines
            étapes.
          </p>

          {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"></div> */}
        </div>

        <div className="border-b border-gray-900/10 pb-5">
          <h2 className="text-base/7 font-semibold text-gray-900 mt-4">
            Vos informations
          </h2>

          <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="firstname"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Prénom<span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  required
                  placeholder="Prénom"
                  value={formData.firstname}
                  onChange={handleChange}
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="lastname"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Nom<span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  required
                  placeholder="Nom"
                  value={formData.lastname}
                  onChange={handleChange}
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Adresse email<span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* <div className="sm:col-span-3">
              <label
                htmlFor="city_id"
                className="block text-sm font-medium text-gray-900"
              >
                Ville<span className="text-red-500">*</span>
              </label>
              <select
                id="city_id"
                name="city_id"
                required
                value={formData.city_id}
                onChange={(e) => handleChange(e)}
                className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
              >
                <option value={0} disabled>
                  -- Sélectionnez une ville --
                </option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.city_name}
                  </option>
                ))}
              </select>
            </div> */}
            <div className="sm:col-span-3 sm:col-start-1">
              <label
                htmlFor="city_id"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Ville<span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  placeholder="Ville"
                  value={formData.city}
                  onChange={handleChange}
                  autoComplete="city"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="zipcode"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Code postal
              </label>
              <div className="mt-1">
                <input
                  id="zipcode"
                  name="zipcode"
                  type="text"
                  placeholder="Code postal"
                  value={formData.zipcode}
                  onChange={handleChange}
                  autoComplete="zipcode"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-full mt-4">
          <label
            htmlFor="motivation"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Votre motivation<span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <textarea
              id="motivation"
              name="motivation"
              rows={4}
              placeholder="Votre motivation"
              value={formData.motivation}
              onChange={handleChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              // defaultValue={""}
            />
          </div>
          <p className="mt-3 text-sm/6 text-gray-600">
            Expliquez en quelques phrases quelles sont vos motivations pour
            devenir bénévole chez PassAges.
          </p>
        </div>

        <div className="border-b border-gray-900/10 pb-3 italic">
          <p className="mt-1 italic text-sm/6 text-gray-600">
            <span className="text-red-500">*</span>&nbsp;Champs obligatoires.
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm/6 font-semibold bg-gray-900  hover:bg-[#ffc412] text-white"
          onClick={() =>
            setFormData({
              firstname: "",
              lastname: "",
              city: "",
              zipcode: "",
              email: "",
              motivation: "",
            })
          }
        >
          Annuler
        </button>
        <button
          type="submit"
          className="bg-[#8584ff] hover:bg-[#ffc412] text-white rounded-md px-3 py-2 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Envoyer ma candidature
        </button>
      </div>
    </form>
  );
}
