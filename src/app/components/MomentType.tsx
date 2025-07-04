export default function MomentType(props: { label: string, moment: Array<{ label: string, value: string }> }) {
    return (
        <div>
            <label>{props.label} </label><br></br><br></br>
            <select className="border-2 border-solid rounded-sm">
                {props.moment.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}