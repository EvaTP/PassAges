export default function BlueButton(props: { label: string }): React.ReactNode {
  return (
    <button className="bg-[#8584ff] hover:bg-fuchsia-500 text-white">
      {props.label}
    </button>
  );
}
