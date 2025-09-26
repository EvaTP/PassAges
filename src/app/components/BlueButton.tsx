import { ButtonProps } from "@/app/types/buttons";

export default function BlueButton(props: ButtonProps): React.ReactNode {
  return (
    <button
      type={props.type || "button"}
      onClick={props.onClick}
      className="bg-[#8584ff] hover:bg-[#ffc412] text-white text-lg font-bold px-4 py-2 md:px-8 md:py-4 whitespace-nowrap"
    >
      {props.label}
    </button>
  );
}
