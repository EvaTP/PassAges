
export default function Logo(props: {image: string, label: string , label2: string }) {
const firstPart =props.label.slice(0,4);
const secondPart= props.label.slice(4);

    return (
        <div className="flex items-center gap-2">
        <img src={props.image} width={50} height={50} />
        <p className="text-xl font-bold whitespace-nowrap"><span className="text-black  font-serif inline">{props.label}</span> <span className="text-pink-500  font-serif inline">{props.label2}</span> </p>
    
</div>
    
    )
}
