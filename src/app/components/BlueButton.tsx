export default function BlueButton(props: { label: string }): React.ReactNode {
  return (
    <button className="bg-[#8584ff] hover:bg-[#ffc412] text-white text-lg font-bold">
      {props.label}
    </button>
  );
}
