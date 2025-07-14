export default function ChooseCity(props: {
  label: string;
  onChange: (city: string | number) => void;
}) {
  const cityChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    props.onChange(inputValue);
  };

  return (
    <div>
      <label>{props.label}</label>
      <br />
      <br />
      <input
        className="border-2 border-solid rounded-sm"
        placeholder="Votre ville"
        onChange={cityChanged}
        type="text"
      />
    </div>
  );
}

// ANCIENNE VERSION AVEC ANY (erreur deploiement)
// export default function ChooseCity(props: {
//   label: any;
//   onChange: (city: string) => void;
// }) {
//   const cityChanged = (e: string) => {
//     props.onChange(e.target.value);
//   };
//   return (
//     <div>
//       <label>{props.label}</label>
//       <br></br>
//       <br></br>
//       <input
//         className="border-2 border-solid rounded-sm "
//         placeholder="Votre ville"
//         onChange={cityChanged}
//       />
//     </div>
//   );
// }
