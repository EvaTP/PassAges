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
    <div className="footer">
      <h3>PASSAGES</h3>
      <p>
        Notre mission est de recréer du lien avec les personnes âgées isolées,
        en leur offrant des moments de partage, d'écoute et de présence.
      </p>
      <div className="social-icons">
        <div className="social">
          <img src="icones/facebook.svg" alt="facebook-icon" />
        </div>
        <div className="social">
          <img src="icones/instagram.svg" alt="instagram-icon" />
        </div>
        <div className="social">
          <img src="icones/linkedin.svg" alt="linkedin-icon" />
        </div>
        <div className="social">
          <img src="icones/twitch.svg" alt="twitch-icon" />
        </div>
      </div>
    </div>
  );
};
