"use client";
import BlueButton from "@/app/components/BlueButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginForm() {
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // empêche le rechargement de la page

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); // ✅ Connexion réussie
        router.push("/home"); //On redirige le bénévole vers la page d'accueil une fois connecté
      } else {
        setMessage(data.message); // ❌ Identifiants incorrects
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setMessage("❌ Erreur de connexion.");
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="bg-rose-50 p-10 shadow-xl rounded-2xl w-full max-w-lg">
          <form
            action="#"
            method="POST"
            className="space-y-6 w-full"
            onSubmit={handleLogin}
          >
            {/* Logo */}
            <div className="flex flex-col items-center">
              <Image
                alt="logo-Passages"
                src="/logo_passages.svg"
                width={100}
                height={100}
                className="mb-4"
              />
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Se connecter
              </h2>
            </div>

            {/* Prénom */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <label
                htmlFor="firstname"
                className="block w-full sm:w-40 text-lg font-semibold text-gray-900 mb-1 sm:mb-0"
              >
                Prénom
              </label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                placeholder="Votre prénom"
                required
                value={firstname ?? ""}
                onChange={(e) => setFirstname(e.target.value)}
                className="flex-1 rounded-md bg-white px-2 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
              />
            </div>

            {/* Mot de passe */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <label
                htmlFor="password"
                className="block w-full sm:w-40 text-lg font-semibold text-gray-900 mb-1 sm:mb-0"
              >
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="votre mot de passe"
                required
                autoComplete="current-password"
                value={password ?? ""}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
              />
            </div>
            {message && <p className="text-red-500 text-sm mt-2">{message}</p>}

            {/* Bouton */}
            <div className="flex justify-center mt-6">
              <BlueButton label="Je me connecte" />
            </div>
          </form>
        </div>
        {/* </div> */}
        {/* <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-2 bg-rose-50 p-8 shadow-xl max-w-lg w-full mx-auto rounded-2xl">
          <form action="#" method="POST" className="space-y-6 w-80 rounded-2xl">
            <div className="flex flex-col items-center rounded">
              <Image
                alt="logo-Passages"
                src="/logo_passages.svg"
                width={80}
                height={80}
                className="mb-2 mt-4"
              />
              <h2 className="mt-10 mb-8 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Se connecter
              </h2>

              {/* Prénom */}
        {/* <div className="flex items-center space-x-4 mb-4">
                <label
                  htmlFor="firstname"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Prénom
                </label>

                <div className="mt-2">
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Mot de passe
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <div className="flex flex-shrink place-content-center mt-4">
                <BlueButton label="Je me connecte" />
              </div>
            </div>
          </form>
        </div> */}
      </div>
    </>
  );
}
