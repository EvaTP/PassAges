"use client";

import Image from "next/image";

export default function Logo(props: {
  image: string;
  firstPart: string;
  secondPart: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Image src={props.image} width={50} height={50} alt="Logo" />
      <p className="text-3xl font-bold whitespace-nowrap">
        <span className="text-black  font-serif inline">{props.firstPart}</span>
        <span className="text-pink-500  font-serif inline">
          {props.secondPart}
        </span>
      </p>
    </div>
  );
}
