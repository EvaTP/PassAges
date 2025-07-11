import Link from "next/link";

export default function NavElement(props: {
  icon: string;
  label: string;
  link: string;
}): React.ReactNode {
  return (
    <li className="mr-10">
      <Link href={props.link} className="hover:text-gray-400 flex items-center">
        <img src={props.icon} className="w-5 h-5 mr-3" alt={props.label} />
        <span className="inline-block">{props.label}</span>
      </Link>
    </li>
  );
}
