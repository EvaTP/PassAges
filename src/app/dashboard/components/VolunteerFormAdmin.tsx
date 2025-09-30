"use client";
import { useEffect, useState } from "react";

type VolunteerFormAdminData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  city: string;
  zipcode?: string;
  activity_id?: number;
  motivation?: string;
};

type City = { id: number; city_name: string };
type Activity = { id: number; activity_type: string };
type Role = { id: number; role: string };

export default function VolunteerForm() {
  const [formData, setFormData] = useState<VolunteerFormAdminData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
    city: "",
    zipcode: "",
    activity_id: 0,
    motivation: "",
  });

  const [cities, setCities] = useState<City[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [citiesRes, activitiesRes, rolesRes] = await Promise.all([
        fetch("/api/cities"),
        fetch("/api/activities"),
        fetch("api/roles"),
      ]);

      if (citiesRes.ok) {
        const result = await citiesRes.json();
        setCities(result.data);
      }
      if (activitiesRes.ok) {
        const result = await activitiesRes.json();
        setActivities(result.data);
      }
      if (rolesRes.ok) {
        const result = await rolesRes.json();
        setRoles(result.data);
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
      const res = await fetch("/api/register", {
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
          city: "",
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
      className="w-full max-w-4xl sm:p-6 md:p-8 space-y-6 bg-white shadow-md rounded-xl mx-auto"
    >
      <h2 className="text-center text-lg font-semibold text-gray-800">
        Création de volontaire
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Prénom */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="firstname"
            className="w-28 text-sm font-medium text-gray-900"
          >
            Prénom :
          </label>
          <input
            type="text"
            name="firstname"
            placeholder="Prénom"
            required
            value={formData.firstname}
            onChange={handleChange}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
        {/* Nom */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="lastname"
            className="w-28 text-sm font-medium text-gray-900"
          >
            Nom :
          </label>
          <input
            type="text"
            name="lastname"
            placeholder="Nom"
            required
            value={formData.lastname}
            onChange={handleChange}
            className="flex-1 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
          />
        </div>
      </div>

      {/* Email */}
      <div className="grid grid-cols-2 gap-6">
        <div className="flex items-center gap-2">
          <label
            htmlFor="email"
            className="w-28 text-sm font-medium text-gray-900"
          >
            Email :
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="-flex-1 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600-2 focus:outline-indigo-600"
          />
        </div>

        {/* Mot de passe */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="password"
            className="w-28 text-sm font-medium text-gray-900"
          >
            Mot de passe :
          </label>

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            required
            value={formData.password}
            onChange={handleChange}
            className="flex-1 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
          />
        </div>
      </div>

      {/* Rôle/Statut */}
      <div className="flex items-center gap-6 mt-10">
        <label
          htmlFor="role"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Statut :
        </label>
        {/* <input
        type="text"
        name="role"
        placeholder="Rôle: admin / volunteer / volunteer_onhold / volunteer_denied"
        value={formData.role}
        onChange={handleChange}
        className="block w-full rounded-md bg-white px-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      /> */}
        <select
          name="role"
          value={formData.role}
          required
          onChange={handleChange}
          className="input"
        >
          <option value="" disabled>
            -- Sélectionnez un statut --
          </option>
          {roles.map((role) => (
            <option key={role.id} value={role.role}>
              {role.role}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-10">
        <div className="flex items-center gap-5">
          {/* Ville */}
          <label
            htmlFor="city"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Ville :
          </label>
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center gap-5">
          {/* Code postal */}
          <label
            htmlFor="zipcode"
            className="w-32 text-sm font-medium text-gray-900"
          >
            Code Postal :
          </label>
          <input
            type="text"
            name="zipcode"
            placeholder="Code postal"
            value={formData.zipcode}
            onChange={handleChange}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      {/* Activité */}
      <div className="flex items-center gap-8">
        <label
          htmlFor="activity"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Activité :
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
              {activity.activity_type}
            </option>
          ))}
        </select>
      </div>

      {/* Motivation */}
      <label
        htmlFor="motivation"
        className="block text-sm/6 font-medium text-gray-900"
      >
        Motivation :
      </label>
      <textarea
        name="motivation"
        rows={4}
        required
        placeholder="Votre motivation"
        value={formData.motivation}
        onChange={handleChange}
        className="block w-full rounded-md bg-white px-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
              city: "",
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
          className="bg-indigo-600 text-white px-8 py-4 rounded hover:bg-yellow-400"
        >
          Envoyer
        </button>
      </div>
    </form>
  );
}
