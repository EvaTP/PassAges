import Image from "next/image";
import Link from "next/link";
// import { useState, useEffect } from "react";
import { prisma } from "@/app/lib/prisma";
// import Header from "@/app/components/Header";
// import Footer from "@/app/components/Footer/Footer";
import BlackButton from "@/app/components/BlackButton";

export default async function Visit() {
  return (
    <>
      <div className="">
        <Image
          className="w-full h-[290px] object-cover"
          src="/images/hero-desktop-visiter.svg"
          alt="hero-image"
          width={180}
          height={50}
          priority
        />
      </div>
      <main className="p-6 bg-gray-50">
        <div className="mx-auto">
          <h1>Je rends visite</h1>
        </div>
      </main>
    </>
  );
}
