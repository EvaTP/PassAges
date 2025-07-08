export default function BlackButton(props: { label: string }): React.ReactNode {
  return (
    <button className="bg-stone-900  hover:bg-[#8584ff] text-white text-xs mb-4">
      {props.label}
    </button>
  );
}
