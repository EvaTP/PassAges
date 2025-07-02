import Logo from "./Logo";
import NavElement from "./Nav-Element";
import BlueButton from "./BlueButton";

export default function Header()
{
    return (
        <div>
            
            <Logo image="" label="PassAges"/>

      <NavElement icon={"/public/icones/house.svg"} label="Accueil" />
      <NavElement
        icon={"/public/icones/accessibility.svg"}
        label="Je rends visite"
      />
      <NavElement
        icon={"/public/icones/book-open.svg"}
        label="Guide du partage"
      />
      <NavElement
        icon={"/public/icones/hand-heart.svg"}
        label="Devenir bénévole"
      />

      <BlueButton label="Faire un don" />
    </div>
  );
}
