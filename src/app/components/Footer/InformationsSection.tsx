import React from "react";
import Link from "next/link";

interface InformationLink {
  label: string;
  href?: string;
  isExternal?: boolean;
}

const informationLinks: InformationLink[] = [
  { label: "FAQs", href: "/faq" },
  { label: "Liste des activités", href: "/activites" },
  {
    label: "Nous contacter",
    href: "mailto:passages@gmail.com",
    isExternal: true,
  },
  { label: "Mentions légales", href: "/mentions-legales" },
];

export const InformationsSection: React.FC = () => {
  return (
    <div className="flex flex-column">
      <h4>INFORMATIONS UTILES</h4>
      <ul className="footer-li">
        <li>FAQs</li>
        <li>Liste des activités</li>
        <li>Nous contacter</li>
        <li>Mentions légales</li>

        {/* {informationLinks.map((link, index) => (
          <li key={index}>
            {link.href ? (
              link.isExternal ? (
                <a href={link.href}>{link.label}</a>
              ) : (
                <Link href={link.href}>{link.label}</Link>
              )
            ) : (
              <span>{link.label}</span>
            )}
          </li>
        ))} */}
      </ul>
    </div>
  );
};
