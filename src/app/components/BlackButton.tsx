import { ButtonProps } from "@/app/types/buttons";

export default function BlackButton(props: ButtonProps): React.ReactNode {
  return (
    <button
      type={props.type || "button"}
      onClick={props.onClick}
      className="bg-stone-900  hover:bg-[#8584ff] text-white py-3 px-10 text-lg font-semibold mb-4 transition-colors duration-200"
    >
      {props.label}
    </button>
  );
}
