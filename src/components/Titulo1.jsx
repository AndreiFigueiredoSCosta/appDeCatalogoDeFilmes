export default function Titulo(props) {
  return (
    <h1 className="text-white font-sans font-semibold text-3xl my-10 sm:ml-24 text-center sm:text-start">
      {props.text}
    </h1>
  );
}
