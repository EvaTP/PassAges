"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import BlackButton from "@/app/components/BlackButton";
import BlueButton from "@/app/components/BlueButton";
import YellowButton from "@/app/components/YellowButton";
import ItemVolunteer from "./components/ItemVolunteer";
import { Volunteer } from "@/app/types/volunteers";

export default function Dashboard() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch("/api/volunteers");
        console.log("Réponse HTTP brute:", response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        const data = result.data;

        const parsedData = data.map((v: any) => ({
          ...v,
          created_at: v.created_at ? new Date(v.created_at) : null,
          updated_at: v.updated_at ? new Date(v.updated_at) : null,
        }));
        setVolunteers(parsedData);
      } catch (err: any) {
        console.error("Erreur lors de la récupération des volontaires:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  // Fonctions pour gérer l'édition et la suppression
  const handleEdit = (volunteerToEdit: Volunteer) => {
    console.log("Éditer le volontaire:", volunteerToEdit);
    // Implémentez ici la logique d'édition (ex: ouvrir un modal, naviguer vers une page d'édition)
    // Par exemple: router.push(`/dashboard/volunteers/edit/${volunteerToEdit.id}`);
  };

  const handleDelete = async (volunteerToDelete: Volunteer) => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer ${volunteerToDelete.firstname} ${volunteerToDelete.lastname} ?`
      )
    ) {
      try {
        const response = await fetch(
          `/api/volunteers/${volunteerToDelete.id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Erreur lors de la suppression: ${response.statusText}`
          );
        }

        // Mettre à jour l'état pour retirer le volontaire supprimé
        setVolunteers((prevVolunteers) =>
          prevVolunteers.filter((v) => v.id !== volunteerToDelete.id)
        );
        console.log(
          "Volontaire supprimé avec succès:",
          volunteerToDelete.firstname
        );
      } catch (err) {
        console.error("Erreur de suppression:", err);
        // Utilisez un modal personnalisé au lieu d'alert pour une meilleure UX
        alert("Échec de la suppression du volontaire.");
      }
    }
  };

  if (loading) {
    return (
      <main className="p-6 bg-gray-50 mt-10 text-center">
        <p>Chargement des volontaires...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6 bg-gray-50 mt-10 text-center text-red-600">
        <p>Erreur lors du chargement des volontaires: {error}</p>
        <p>
          Veuillez vérifier que votre API `/api/volunteers` est opérationnelle
          et renvoie les données au format attendu.
        </p>
      </main>
    );
  }

  return (
    <>
      <div className="">
        <Image
          className="w-full h-[290px] object-cover"
          src="/images/hero-dashboard.svg"
          alt="hero-image"
          width={180}
          height={50}
          priority
        />
      </div>

      <main className="p-6 bg-gray-50 mt-10">
        <h1>DASHBOARD ADMINISTRATEUR</h1>
        <h2 className="text-2xl font-semibold mb-8">Gestion des Volontaires</h2>

        {volunteers.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            Aucun volontaire trouvé pour le moment.
          </p>
        ) : (
          <div className="flex flex-col space-y gap-4 p-4">
            {volunteers.map((volunteer) => (
              <ItemVolunteer
                key={volunteer.id}
                volunteer={volunteer}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
            <div></div>
          </div>
        )}
      </main>
    </>
  );
}
