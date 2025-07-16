import { ButtonProps } from "@/app/types/buttons";

export default function BlueButton(props: {
  label: string;
  onClick: () => void;
}): React.ReactNode {
  return (
    <button className="bg-[#8584ff] hover:bg-[#ffc412] text-white text-lg font-bold px-8 py-4">
      {props.label}
    </button>
  );
}
