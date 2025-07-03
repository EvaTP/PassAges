export default function NavElement (props: { icon: string, label: string,   }): React.ReactNode
{
    return (<a href="#"><img src={props.icon} /> {props.label}</a> )
}