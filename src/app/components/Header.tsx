import Logo from "./Logo";
import NavElement from "./Nav-Element";
import BlueButton from "./BlueButton";

export default function Header()
{
    return (
        <div>
            
            <Logo image="" label="PassAges"/>

           <NavElement icon={''} label="Adaence" />
           <NavElement icon={''} label="Accueil" />
           <NavElement icon={''} label="Je rends visite" />
           <NavElement icon={''} label="Guide du partage" />
           <NavElement icon={''} label="Devenir bénévole" />

           <BlueButton label="Faire un don" />

        </div>
        
    )
}