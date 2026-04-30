import axiosSecure from "@/lib/axios/axiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAllUsers = () => {
  const {
    data: allUser,
    isLoading: allUserLoading,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/users");
        return res.data?.data;
      } catch (error) {
        console.log(`ERROR While Fetching All Users: ${error}`);
      }
    },
  });

  return { allUser, allUserLoading, isError, isPending };
};

export default useAllUsers;
