//"use client";
import Image from "next/image";
import LoginForm from "@/app/components/LoginForm";
// import { useState, useEffect } from "react";
import { prisma } from "@/lib/prisma";
import YellowButton from "@/app/components/YellowButton";

export default async function Login() {
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

      <main className="p-10 bg-white mb-5">
        <h1>CONNEXION</h1>
        <p className="text-center mt-1 mb-5 text-2xl">
          Connectez-vous à votre compte et commencez à proposer des visites.
          <br />
          Chaque sourire porte une histoire, chaque rencontre est une promesse.
        </p>
        <LoginForm />
        <div>
          <p className="mt-10 text-center text-lg text-gray-800">
            Pas encore membre de la communauté Passages ? 👇
          </p>
          <br></br>
          <div className="flex justify-center p-8">
            <YellowButton label="Devenir bénévole" />
          </div>
        </div>
      </main>
    </>
  );
}
