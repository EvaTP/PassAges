"use client";
import { useEffect, useState } from "react";

type VolunteerFormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  city_id: number;
  zipcode?: string;
  activity_id: number;
  motivation: string;
};

type City = { id: number; city_name: string };
type Activity = { id: number; activity_name: string };

export default function VolunteerForm() {
  const [formData, setFormData] = useState<VolunteerFormData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
    city_id: 0,
    zipcode: "",
    activity_id: 0,
    motivation: "",
  });

  const [cities, setCities] = useState<City[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [citiesRes, activitiesRes] = await Promise.all([
        fetch("/api/cities"),
        fetch("/api/activities"),
      ]);

      if (citiesRes.ok) {
        const result = await citiesRes.json();
        setCities(result.data);
      }
      if (activitiesRes.ok) {
        const result = await activitiesRes.json();
        setActivities(result.data);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "city_id" || name === "activity_id" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/volunteers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Inscription réussie !");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          role: "",
          city_id: 0,
          zipcode: "",
          activity_id: 0,
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
      className="w-full space-y-6 p-6 bg-white shadow-md rounded-xl max-w-xl mx-auto"
    >
      <h2 className="text-center text-lg font-semibold text-gray-800">
        Création de volontaire
      </h2>

      {/* Prénom */}
      <div className="flex flex-row gap-4">
        <label
          htmlFor="firstname"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Prénom
        </label>
        <input
          type="text"
          name="firstname"
          placeholder="Prénom"
          required
          value={formData.firstname}
          onChange={handleChange}
          className="input"
        />
        {/* Nom */}
        <label
          htmlFor="lastname"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Nom
        </label>
        <input
          type="text"
          name="lastname"
          placeholder="Nom"
          required
          value={formData.lastname}
          onChange={handleChange}
          className="input"
        />
      </div>

      {/* Email */}
      <div className="flex flex-row gap-4">
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="input"
        />
        {/* Mot de passe */}
        <label
          htmlFor="password"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Mot de passe
        </label>
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          required
          value={formData.password}
          onChange={handleChange}
          className="input"
        />
      </div>

      {/* Rôle */}
      <label
        htmlFor="role"
        className="block text-sm/6 font-medium text-gray-900"
      >
        Statut
      </label>
      <input
        type="text"
        name="role"
        placeholder="Rôle (facultatif)"
        value={formData.role}
        onChange={handleChange}
        className="input"
      />

      {/* Ville */}
      <label
        htmlFor="city"
        className="block text-sm/6 font-medium text-gray-900"
      >
        Ville
      </label>
      <select
        name="city_id"
        value={formData.city_id}
        required
        onChange={handleChange}
        className="input"
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

      {/* Code postal */}
      <label
        htmlFor="zipcode"
        className="block text-sm/6 font-medium text-gray-900"
      >
        Code Postal
      </label>
      <input
        type="text"
        name="zipcode"
        placeholder="Code postal"
        value={formData.zipcode}
        onChange={handleChange}
        className="input"
      />

      {/* Activité */}
      <label
        htmlFor="activity"
        className="block text-sm/6 font-medium text-gray-900"
      >
        Activité
      </label>
      <select
        name="activity_id"
        value={formData.activity_id}
        required
        onChange={handleChange}
        className="input"
      >
        <option value={0} disabled>
          -- Sélectionnez une activité --
        </option>
        {activities.map((activity) => (
          <option key={activity.id} value={activity.id}>
            {activity.activity_name}
          </option>
        ))}
      </select>

      {/* Motivation */}
      <textarea
        name="motivation"
        rows={4}
        required
        placeholder="Votre motivation"
        value={formData.motivation}
        onChange={handleChange}
        className="input"
      />

      <div className="flex justify-end gap-4 mt-4">
        <button
          type="button"
          onClick={() => {
            setFormData({
              firstname: "",
              lastname: "",
              email: "",
              password: "",
              role: "",
              city_id: 0,
              zipcode: "",
              activity_id: 0,
              motivation: "",
            });
          }}
          className="bg-gray-600 text-white px-8 py-2 rounded"
        >
          Annuler
        </button>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-yellow-400"
        >
          Envoyer
        </button>
      </div>
    </form>
  );
}
