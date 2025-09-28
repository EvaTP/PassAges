import React from "react";
import Image from "next/image";

interface SocialIcon {
  src: string;
  alt: string;
  href?: string;
}

const socialIcons: SocialIcon[] = [
  {
    src: "/icones/facebook.svg",
    alt: "facebook-icon",
    href: "https://facebook.com",
  },
  {
    src: "/icones/instagram.svg",
    alt: "instagram-icon",
    href: "https://instagram.com",
  },
  {
    src: "/icones/linkedin.svg",
    alt: "linkedin-icon",
    href: "https://linkedin.com",
  },
  { src: "/icones/twitch.svg", alt: "twitch-icon", href: "https://twitch.tv" },
];

export const PassagesSection: React.FC = () => {
  return (
    <div className="flex flex-col p-2 bg-gray-900 max-w-sm mx-auto rounded-md">
      <h4
        className="text-xl font-bold mb-2 text-pink-400"
        style={{ color: "pink" }}
      >
        PASSAGES
      </h4>
      <p className="mb-4 leading-relaxed text-white">
        Notre mission est de recréer du lien avec les personnes âgées isolées,
        en leur offrant des moments de partage, d&apos;écoute et de présence.
      </p>
      <div className="flex space-x-4 gap-4 ml-2">
        {socialIcons.map(({ src, alt }) => (
          <a
            key={alt}
            href="#"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition"
            aria-label={alt}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={src} alt={alt} width={24} height={24} />
          </a>
        ))}
      </div>
    </div>
  );
};
