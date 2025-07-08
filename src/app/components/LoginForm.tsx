"use client";
import Image from "next/image";
import BlueButton from "@/app/components/BlueButton";

export default function LoginForm() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-2 bg-rose-50 p-4 shadow-xl">
          <form action="#" method="POST" className="space-y-6 w-80">
            <div>
              <h2 className="mt-10 mb-8 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                <img
                  alt="logo-Passages"
                  src="/logo_passages.svg"
                  className="mx-auto h-10 w-auto"
                />{" "}
                Se connecter
              </h2>
              <label
                htmlFor="text"
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
              <div className="flex flex-shrink place-content-center">
                <BlueButton label="Envoyer" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
