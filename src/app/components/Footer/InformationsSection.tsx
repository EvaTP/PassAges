import React from "react";

interface InformationLink {
  label: string;
  href?: string;
  isExternal?: boolean;
}

const informationLinks: InformationLink[] = [
  { label: "FAQs", href: "/#" },
  { label: "Liste des activités", href: "/#" },
  {
    label: "Nous contacter",
    href: "mailto:passages@gmail.com",
    isExternal: true,
  },
  { label: "Mentions légales", href: "/#" },
];

export const InformationsSection: React.FC = () => {
  return (
    <div className="flex flex-col p-2">
      <h4
        className="text-xl font-bold mb-2 text-pink-400"
        style={{ color: "pink" }}
      >
        INFORMATIONS UTILES
      </h4>
      <ul className="footer-li text-white">
        <li>FAQs</li>
        <li>Liste des activités</li>
        <li>Nous contacter</li>
        <li>Mentions légales</li>
      </ul>
    </div>
  );
};
