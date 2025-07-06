"use client";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer/Footer";
import { useState, useEffect } from "react";
import { prisma } from "@/lib/prisma";
// Rubrique "Pourquoi devenir bénévole"
import { WHY_VOLUNTEER } from "@/app/data/cards";

export default function Volunteers() {
  return (
    // <p>Volunteers page</p>;
    <>
      <div>
        <div className="bg-rose-50 mb-15 p-6">
          <h2 className="text-center text-2xl font-bold mb-2">
            POURQUOI DEVENIR BÉNÉVOLE ?
          </h2>
          <p className="text-center mt-2 mb-15 text-xl">
            Être bénévole chez Pass<span className="text-pink-500">Ages</span>,
            c'est bien plus qu'une simple activité.
            <br></br>
            C'est une expérience enrichissante qui apporte du sens à votre vie
            et à celle des autres.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {WHY_VOLUNTEER.map((w, index) => (
              <div
                key={w.title || index}
                className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
              >
                <span className="text-4xl mb-2">{w.emoji}</span>
                <h3 className="">{w.title}</h3>
                <p className="text-sm text-gray-600">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
