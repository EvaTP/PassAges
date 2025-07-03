export default function BlueButton(props: { label: string }): React.ReactNode {
  return <button className="bg-blue-400 text-white">{props.label}</button>;
}