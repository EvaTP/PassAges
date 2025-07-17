"use client"; // composant Client Component
import { ButtonProps } from "@/app/types/buttons";

import { useRouter } from "next/navigation";
import react from "react";
import BlackButton from "@/app/components/BlackButton";

export default function BlackButtonVisit({ label }: { label: string }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/visit");
  };

  return (
    <button
      onClick={handleClick}
      className="bg-stone-900 hover:bg-[#8584ff] text-white py-8 px-4 text-lg font-semibold mb-4 transition-colors duration-200"
    >
      {label}
    </button>
  );
}
