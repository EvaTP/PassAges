


export default function ChooseCity(props: { label: string, onChange: (city: string) => void }) {
  const cityChanged = (e: any) => {
    props.onChange(e.target.value)
  }
  return (
    <div>
      <label>{props.label}</label>
      <br></br><br></br>
      <input className="border-2 border-solid rounded-sm " placeholder="Votre ville" onChange={cityChanged} />
    </div>
  );
}
