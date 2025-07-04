


export default function ChooseCity(props: { label: string }) {
  return (
    <div>
      <label>{props.label}</label>
      <br></br><br></br>
      <input className="border-2 border-solid rounded-sm " placeholder="Votre ville" />
    </div>
  );
}
