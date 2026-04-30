import AdminGuard from "@/components/auth/AdminGuard";

const AdmineLayout = ({ children }) => {
  return <AdminGuard>{children}</AdminGuard>;
};

export default AdmineLayout;
