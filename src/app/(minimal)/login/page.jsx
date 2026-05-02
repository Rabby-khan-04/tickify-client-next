import Login from "@/components/auth/Login";
import Spinner from "@/components/shared/loader/Spinner";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Login />
    </Suspense>
  );
};

export default LoginPage;
