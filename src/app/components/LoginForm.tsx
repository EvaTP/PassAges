"use client";
import Image from "next/image";
import BlackButton from "@/app/components/BlackButton";
import BlueButton from "@/app/components/BlueButton";
import YellowButton from "@/app/components/YellowButton";

export default function LoginForm() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            <img
              alt="logo-Passages"
              src="/logo_passages.svg"
              className="mx-auto h-10 w-auto"
            />{" "}
            Se connecter
          </h2>
        </div>

        <div className="mt-10 bg-rose-50 p-4 shadow-xl">
          <form action="#" method="POST" className="space-y-6 w-80">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Addresse email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
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

              {/* <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button> */}
            </div>
          </form>

          {/* <p className="mt-10 text-center text-sm/8 text-gray-500">
            Pas encore membre de la communauté Passages ? <br></br>
			<YellowButton/>
            <a
              href="/volunteers"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              👉 Devenez membre
            </a>
          </p> */}
        </div>
      </div>
    </>
  );
}
