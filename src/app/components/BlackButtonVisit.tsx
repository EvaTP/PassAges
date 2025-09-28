import { ButtonProps } from "@/app/types/buttons";
import Link from "next/link";

// import BlackButton from "@/app/components/BlackButton";

export default function BlackButtonVisit(props: ButtonProps): React.ReactNode {
  return (
    <Link href="/visit">
      <button
        type="button"
        className="bg-stone-900 hover:bg-[#8584ff] text-white py-8 px-4 text-lg font-semibold mb-4 rounded transition-colors duration-200"
      >
        {props.label}
      </button>
    </Link>
  );
}
