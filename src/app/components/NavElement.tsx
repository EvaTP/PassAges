import Link from "next/link";
import Image from "next/image";

export default function NavElement(props: {
  icon: string;
  label: string;
  link: string;
}): React.ReactNode {
  return (
    <li className="mr-10">
      <Link href={props.link} className="hover:text-gray-400 flex items-center">
        <Image
          src={props.icon}
          width={20}
          height={20}
          alt={props.label}
          className="mr-3"
        />
        <span className="inline-block">{props.label}</span>
      </Link>
    </li>
  );
}
