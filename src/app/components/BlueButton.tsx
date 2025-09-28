import { ButtonProps } from "@/app/types/buttons";
import Link from "next/link";

export default function BlueButton(props: ButtonProps): React.ReactNode {
  return (
    <Link href="/#">
      <button
        type={props.type || "button"}
        onClick={props.onClick}
        className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold px-8 py-4 rounded mb-4 transition-colors duration-200"
      >
        {props.label}
      </button>
    </Link>
  );
}
