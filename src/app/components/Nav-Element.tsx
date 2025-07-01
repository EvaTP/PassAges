export default function NavElement (props: { icon: any, label: string,   }): React.ReactNode
{
    return (<a href="#">{props.icon} {props.label}</a> )
}