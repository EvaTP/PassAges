import { ButtonProps } from "@/app/types/buttons";
import Link from "next/link";

export default function YellowButton(props: ButtonProps): React.ReactNode {
  return (
    <Link href="/volunteers">
      <button
        type={props.type || "button"}
        onClick={props.onClick}
        className="bg-[#ffc412] hover:bg-[#8584ff] text-white text-lg font-bold px-8 py-4 rounded mb-4 transition-colors duration-200"
      >
        {props.label}
      </button>
    </Link>
  );
}
