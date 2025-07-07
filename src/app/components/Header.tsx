import Logo from "./Logo";
import NavElement from "./NavElement";
import BlueButton from "./BlueButton";

export default function Header() {
  return (
    <div className="flex flex-row items-center gap-x-4 mt-2 justify-between w-full px-4 py-2 bg-gray-200">
      {/* Logo    */}
      <div className="flex flex-row size-20 ">
        <Logo
          image="/logo_passages.svg"
          label="Pass"
          label2="Ages"
          //     <span className="text-pink-500">Ages</span>
        />
      </div>

      {/* Nav Elements    */}
      <div className="flex items-center space-x-2">
        <ul className="flex space-x-6 items-center gap-4">
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
        </ul>
      </div>

      {/* Button */}
      <div className="flex flex-shrink">
        <BlueButton label="Faire un don&nbsp;🫶" />
      </div>
    </div>
  );
}
