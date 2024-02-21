export default function AuthInput({ label, id, ...props }) {
  return (
    <div className="field">
      <input id={id} name={id} {...props} placeholder={label} required />
    </div>
  );
}
