
export default function Logo(props: {image: string, label: string  }) {
    return (
        <div className="flex items-center gap-2">
        <img src={props.image} width={50} height={50}   /> <label className="text-xl font-bold font-serif">{props.label}</label>
        </div>
    //     <div className="flex items-center gap-2">
    //   <img src={image} alt="Logo PassAges" className="w-10 h-10 object-contain" />
    //   <h1 className="text-xl font-bold font-serif">
    //     <span className="text-black">Pass</span>
    //     <span className="text-pink-500">Ages</span>
    //   </h1>
    // </div>

    )
}
