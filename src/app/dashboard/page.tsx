"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import ItemVolunteer from "./components/ItemVolunteer";
import VolunteerOnhold from "./components/VolunteerOnhold";
import VolunteerFormAdmin from "./components/VolunteerFormAdmin";
import { Volunteer } from "@/app/types/volunteers";
import ConfirmationModal from "./components/ConfirmationModal";

export default function Dashboard() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showVolunteers, setShowVolunteers] = useState(false);
  const [showVolunteersOnHold, setShowVolunteersOnHold] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error">("success");

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

  //^ LISTE DE TOUS LES VOLONTAIRES avec actions edit et delete

  // Fonctions pour gérer l'édition et la suppression
  const handleEdit = (volunteerToEdit: Volunteer) => {
    console.log("Éditer le volontaire:", volunteerToEdit);
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
        // mettre un modal personnalisé au lieu d'alert pour une meilleure UX
        alert("Échec de la suppression du volontaire.");
      }
    }
  };
  //^ LISTE DES VOLONTAIRES EN ATTENTE DE VALIDATION (_onhold) avec actions accept et deny
  // Filtrer les volontaires en attente (role)
  const volunteersOnHold = volunteers.filter(
    (volunteer) => volunteer.role === "volunteer_onhold"
  );

  // Mettre à jour le statut dans "Volontaires en attente" : accepter ou refuser
  // const handleUpdateRole = async (volunteerId: number, newRole: string) => {
  //   try {
  //     const response = await fetch(`/api/volunteers/${volunteerId}/role`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ role: newRole }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Erreur lors de la mise à jour du rôle");
  //     }

  //     const updatedVolunteer = await response.json();

  //      setModalMessage(
  //     newRole === "volunteer"
  //       ? "✅ Volontaire accepté !"
  //       : "❌ Volontaire refusé."
  //   );
  //     setModalType("success");
  //     setModalVisible(true);

  //     // Met à jour localement la liste des bénévoles
  //     setVolunteers((prevVolunteers) =>
  //       prevVolunteers.map((v) =>
  //         v.id === volunteerId ? { ...v, role: newRole } : v
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Erreur mise à jour du rôle:", error);
  //     setModalMessage("❌ Erreur lors de l'acceptation");
  //     setModalType("error");
  //     setModalVisible(true);
  //   }
  // };

  const handleUpdateRole = async (volunteerId: number, newRole: string) => {
    try {
      const response = await fetch(`/api/volunteers/${volunteerId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du rôle");
      }

      const updatedVolunteer = await response.json();

      // 💡 Affichage du message de succès
      setModalMessage(
        newRole === "volunteer"
          ? "✅ Volontaire accepté !"
          : "❌ Volontaire refusé."
      );
      setModalType("success");
      setModalVisible(true);

      // 💾 Mise à jour de la liste des bénévoles localement
      setVolunteers((prev) =>
        prev.map((v) => (v.id === volunteerId ? { ...v, role: newRole } : v))
      );
    } catch (error) {
      console.error("Erreur mise à jour du rôle:", error);
      setModalMessage("❌ Une erreur est survenue.");
      setModalType("error");
      setModalVisible(true);
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
      <div className="w-full">
        <Image
          className="w-full h-[290px] object-cover"
          src="/images/hero-dashboard.svg"
          alt="hero-image"
          width={180}
          height={50}
          priority
        />
      </div>

      {/* AFFICHAGE VOLONTAIRES */}
      <main className="flex flex-col w-full p-6 bg-gray-50 mt-10">
        <h1>DASHBOARD ADMINISTRATEUR</h1>
        {/* TOUS LES VOLONTAIRES */}
        <section className="w-[90%]">
          <h2 className="text-2xl font-semibold mb-8 mt-6 text-pink-500">
            Gestion des Volontaires
          </h2>

          <div className="bg-white shadow-lg rounded-xl p-4 mb-6">
            <button
              onClick={() => setShowVolunteers(!showVolunteers)}
              className="w-full text-left text-lg font-medium text-gray-700 hover:text-pink-500 transition-colors"
            >
              {showVolunteers
                ? "Masquer les volontaires"
                : "Afficher tous les volontaires"}
            </button>

            {/* Liste des volontaires affichée seulement si showVolunteers est true */}
            <div className={`${showVolunteers ? "block" : "hidden"} mt-4`}>
              {volunteers.length === 0 ? (
                <p className="text-center text-lg text-gray-600">
                  Aucun volontaire trouvé pour le moment.
                </p>
              ) : (
                <div className="flex flex-col gap-4">
                  {volunteers.map((volunteer) => (
                    <ItemVolunteer
                      key={volunteer.id}
                      volunteer={volunteer}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
        {/* VOLONTAIRES EN ATTENTE DE VALIDATION */}
        <section className="w-[90%] bg-color-gray">
          <h2 className="text-2xl font-semibold mb-4 mt-6 text-pink-500">
            Volontaires en attente de validation
          </h2>

          <div className="bg-white shadow-lg rounded-xl p-4 mb-6">
            <button
              onClick={() => setShowVolunteersOnHold(!showVolunteersOnHold)}
              className="w-full text-left text-lg font-medium text-gray-700 hover:text-pink-500 transition-colors"
            >
              {showVolunteersOnHold
                ? "Masquer les volontaires en attente"
                : "Afficher les volontaires en attente"}
            </button>

            <div
              className={`${showVolunteersOnHold ? "block" : "hidden"} mt-4`}
            >
              {volunteersOnHold.length === 0 ? (
                <p className="text-center text-lg text-gray-600">
                  Aucune demande de volontariat pour le moment.
                </p>
              ) : (
                <div className="flex flex-col space-y-4">
                  {volunteersOnHold.map((volunteer) => (
                    <VolunteerOnhold
                      key={volunteer.id}
                      volunteer={volunteer}
                      onAccept={(id) => handleUpdateRole(id, "volunteer")}
                      onDeny={(id) => handleUpdateRole(id, "volunteer_denied")}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* {volunteersOnHold.length === 0 ? (
            <p className="text-center text-lg text-gray-600">
              Aucune demande de volontariat pour le moment.
            </p>
          ) : (
            <div className="flex flex-col space-y-4 p-4">
              {volunteersOnHold.map((volunteer) => (
                <VolunteerOnhold
                  key={volunteer.id}
                  volunteer={volunteer}
                  onAccept={handleEdit}
                  onDeny={handleDelete}
                />
              ))}
            </div>
          )} */}
        </section>

        <section className="w-full">
          <div className="w-full">
            <h2 className="ml-20 mt-6 mb-4 text-2xl text-pink-500">
              Ajouter un volontaire
            </h2>
            <VolunteerFormAdmin />
          </div>
        </section>

        {/* MODALE DE CONFIRMATION */}
        {modalVisible && (
          <ConfirmationModal
            message={modalMessage}
            type={modalType}
            onClose={() => setModalVisible(false)}
          />
        )}
      </main>
    </>
  );
}
