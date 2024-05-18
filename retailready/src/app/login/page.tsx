// import LoginForm from "./login-form";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("./login-form"), { ssr: false });

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-retailready-blue">
      <h1 className="text-3xl font-semibold font-raleway mb-5">Log In</h1>
      <LoginForm />
    </div>
  );
}
