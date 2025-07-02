
export default function Logo(props: {image: string, label: string}) {
    return (
        <div>
        <img src={props.image} /> <label>{props.label}</label>
        </div>


    )
}
