import MomentType from "./MomentType";
import ChooseCity from "./ChooseCity";
import BlackButton from "./BlackButton";


export default function MomentToShare() : React.ReactNode
{
    // On doit créer le tableau avec les éléments de la liste déroulantes en premier
    const moments =[
         { label: '-- Choisissez un moment --', value: 'moment' },
         { label: 'Un café/thé', value: ' café/thé' },
         { label: 'Un repas', value: 'repas' },
         { label: 'Une promenade', value: ' promenade' },
         { label: 'Une sortie culturelle', value: 'sortie' },
         { label: 'Un cinéma', value: ' cinéma' },
         { label: 'Autres activité', value: 'autres' },
         
    ]
    return(
        <section  className="flex justify-center">
            <div className="flex flex-row  justify-center  content-between gap-15 border-2 rounded-sm w-[80%]  shadow-[10px_10px_0_rgba(0,0,0,0.20)]">
                <MomentType label="Moments à partager"  moment={moments} /><br></br>
            <ChooseCity label="Localisation" />
            <div className="mt-5">
                <BlackButton label="Rechercher" />
            </div>

            </div>
            
            
        </section>
    )
}
