interface ToggleProps {
  checked: boolean;
  onChange?: () => void;
}

export default function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <label className="toggle">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="slider" />
    </label>
  );
}
