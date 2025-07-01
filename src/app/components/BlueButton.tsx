export default function BlueButton(props: { label: string }): React.ReactNode {
  return <button className="blue-button">{props.label}</button>;
}