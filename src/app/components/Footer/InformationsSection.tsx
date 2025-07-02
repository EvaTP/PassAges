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
    <div className="footer">
      <h3>INFORMATIONS UTILES</h3>
      <ul>
        {informationLinks.map((link, index) => (
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
        ))}
      </ul>
    </div>
  );
};
