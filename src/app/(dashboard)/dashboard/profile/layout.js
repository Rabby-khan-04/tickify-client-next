import PrivateRoute from "@/components/auth/PrivateRoute";

const ProfileLayout = ({ children }) => {
  return <PrivateRoute>{children}</PrivateRoute>;
};

export default ProfileLayout;
