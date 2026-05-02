import Register from "@/components/auth/Register";
import Spinner from "@/components/shared/loader/Spinner";
import { Suspense } from "react";

const RegisterPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Register />
    </Suspense>
  );
};

export default RegisterPage;
