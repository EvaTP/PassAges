import Logo from "./Logo";
import NavElement from "./NavElement";
import BlueButton from "./BlueButton";

export default function Header()
{
    return (
        <div className="flex flex-row  gap-x-4 mt-10 mb-10" >

            {/* Logo    */}
            <div className="flex flex-row flex-shrink-0  size-14" >
                <Logo image="/logo_passages.svg" label="PassAges"  
                  
                />
            </div>
                
             {/* Nav Elements    */}
            <div className="flex flex-shrink-0">
              
              <NavElement icon="icones/house.svg" label="Accueil" />
              <NavElement icon={"icones/accessibility.svg"} label="Je rends visite"/>
              <NavElement icon={"icones/book-open.svg"} label="Guide du partage"/>
              <NavElement icon={"icones/hand-heart.svg"} label="Devenir bénévole" />
             
            </div>

            {/* Button */}
            <div className="flex flex-shrink-0">
              <BlueButton label="Faire un don" />  
            </div>
            

      

      
    </div>
  );
}

