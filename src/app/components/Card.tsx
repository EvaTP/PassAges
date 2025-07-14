"use client";
import { CardData } from "@/app/types/card";

interface CardProps {
  card: CardData;
}

export default function Card({ card }: CardProps): React.ReactNode {
  return (
    <div className="card">
      <p>{card.emoji}</p>
      <p className="card-title">{card.title}</p>
      <p>{card.text}</p>
    </div>
  );
}
