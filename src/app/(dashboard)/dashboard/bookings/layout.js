import PrivateRoute from "@/components/auth/PrivateRoute";

const BookingLayout = ({ children }) => {
  return <PrivateRoute>{children}</PrivateRoute>;
};

export default BookingLayout;
