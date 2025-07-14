export default function BlackButton(props: { label: string }): React.ReactNode {
  return (
    <button className="bg-stone-900  hover:bg-[#8584ff] text-white py-3 px-10 text-lg font-semibold mb-4 transition-colors duration-200">
      {props.label}
    </button>
  );
}
