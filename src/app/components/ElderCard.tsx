"use client";
import Image from "next/image";

export default function ElderCard(props: { elder: any }): React.ReactNode {
  return (
    //<button className="black-button">{props.label}</button>;
    <div className="item">
      <div className="imageWrapper">
        <Image
          className="photo"
          src={props.elder.imageUrl}
          alt={`Photo de ${props.elder.firstname}`}
          priority
          width={100}
          height={100}
        />
      </div>

      <h2>{props.elder.firstname}</h2>
      <h3>
        {props.elder.age} ans, {props.elder.job}
      </h3>
      <p>
        {props.elder.zipcode} {props.elder.city}
      </p>
      <p>Activité : {props.elder.type}</p>
      <p>{props.elder.description}</p>
    </div>
  );
}
