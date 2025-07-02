import MomentType from "./Moment-Type";
import ChooseCity from "./ChooseCity";
import BlackButton from "./BlackButton";


export default function MomentToShare() : React.ReactNode
{
    // On doit créer le tableau avec les éléments de la liste déroulantes en premier
    const moments =[
         { label: 'Un café/thé', value: ' café/thé' },
         { label: 'Un repas', value: 'repas' },
         { label: 'Une promenade', value: ' promenade' },
         { label: 'Une sortie', value: 'sortie' },
         { label: 'Autres activité', value: 'autres' }
    ]
    return(
        <section>
            
            <MomentType label="Moments à partager"  moment={moments} /><br></br>
            <ChooseCity label="Localisation" />
            <BlackButton label="Rechercher" />
        </section>
    )
}
