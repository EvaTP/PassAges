import Link from "next/link";

export default function YellowButton(props: {
  label: string;
}): React.ReactNode {
  return (
    <Link href="/volunteers">
      <button className="bg-[#ffc412] hover:bg-[#8584ff] text-white text-lg text-bold px-6 py-4 rounded transition-colors">
        {props.label}
      </button>
    </Link>
  );
}
