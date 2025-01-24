import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";

export default function NonLogin() {
  return (
    <div className="flex flex-col items-center text-center">
      <Title level={2}>Please login or create new account</Title>
      <div className="flex text-lg gap-2">
        <Link to="/login" className="font-bold">
          Log In
        </Link>
        or
        <Link to="/signup" className="font-bold">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
