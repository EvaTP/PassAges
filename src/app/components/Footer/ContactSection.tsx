import React from "react";

interface ContactInfo {
  type: "address" | "email" | "phone";
  content: string;
  href?: string;
}

const contactInfo: ContactInfo[] = [
  { type: "address", content: "116 rue du Faubourg Saint-Martin" },
  { type: "address", content: "75010 Paris, France" },
  {
    type: "email",
    content: "Email : contact@passages.fr",
    href: "mailto:contact@passages.fr",
  },
  {
    type: "phone",
    content: "Tél. : + 33 1 23 45 67 89",
    href: "tel:+33123456789",
  },
];

export const ContactSection: React.FC = () => {
  return (
    <div className="flex flex-column p-2">
      <h4
        className="text-xl font-bold mb-2 text-pink-400"
        style={{ color: "pink" }}
      >
        CONTACT
      </h4>
      <br></br>
      {contactInfo.map((info, index) => (
        <p className="text-white" key={index}>
          {info.href ? (
            <a href={info.href} className="text-white hover:underline">
              {info.content}
            </a>
          ) : (
            info.content
          )}
        </p>
      ))}
    </div>
  );
};
