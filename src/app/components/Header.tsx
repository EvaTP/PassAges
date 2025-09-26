"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import { Menu } from "lucide-react";
import NavElement from "./NavElement";
import BlueButton from "./BlueButton";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-row items-center gap-x-4 mt-2 justify-between w-full px-4 py-2 bg-gray-200">
      {/* Logo */}
      <div className="flex w-full md:w-auto justify-between items-center">
        <Logo image="/logo_passages.svg" firstPart="Pass" secondPart="Ages" />
      </div>

      {/* Burger Menu Button*/}
      <button
        className="md:hidden p-2 focus:outline-none"
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <Menu size={24} />
      </button>

      {/* Nav Elements */}

      <div
        className={`flex w-full md:w-auto ${
          isMenuOpen ? "flex" : "hidden"
        } md:flex`}
      >
        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 items-center gap-4 md:gap-0">
          <NavElement icon="icones/house.svg" label="Accueil" link="/home" />
          <NavElement
            icon="icones/accessibility.svg"
            label="Je rends visite"
            link="/visit"
          />
          <NavElement
            icon="icones/hand-heart.svg"
            label="Devenir bénévole"
            link="/volunteers"
          />
          <NavElement
            icon="icones/log-in.svg"
            label="Connexion"
            link="/login"
          />
        </ul>

        {/* <ul className="flex space-x-6 items-center gap-4">
          <NavElement icon="icones/house.svg" label="Accueil" link="/home" />
          <NavElement
            icon={"icones/accessibility.svg"}
            label="Je rends visite"
            link="/visit"
          />
          <NavElement
            icon={"icones/hand-heart.svg"}
            label="Devenir bénévole"
            link="/volunteers"
          />
          <NavElement
            icon={"icones/log-in.svg"}
            label="Connexion"
            link="/login"
          />
        </ul> */}
      </div>

      {/* Button */}
      <div className="flex flex-shrink md:ml-4">
        <BlueButton label="Faire un don&nbsp;🫶" />
      </div>
    </div>
  );
}
