import Spinner from "./Spinner";

function Loader() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Spinner className="h-12 w-12" />
    </div>
  );
}
export default Loader;
