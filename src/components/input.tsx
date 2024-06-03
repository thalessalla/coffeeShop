interface Props {
  type: string;
  placeholder: string;
}

function Input({ type, placeholder }: Props) {
  return (
    <>
      <input className="mt-4 p-2" type={type} placeholder={placeholder} />
    </>
  );
}

export default Input;
