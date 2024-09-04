import { useRouteError } from "react-router-dom";
const ErrorPage = () => {
  const err = useRouteError();

  return (
    <div>
      <h1>! Oops something went wrong</h1>
      <h2>{err.status}</h2>
      <h2>{err.statusText}</h2>
    </div>
  );
};

export default ErrorPage;
