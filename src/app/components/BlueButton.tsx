export default function BlueButton(props: { label: string }): React.ReactNode {
  return <button className="black-button">{props.label}</button>;
}