import axiosSecure from "@/lib/axios/axiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useAddTheater = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newTheater) => {
      const { data } = await axiosSecure.post("/theaters", newTheater);

      return data;
    },

    onSuccess: () => {
      toast.success("Theater added successfully!!");
      queryClient.invalidateQueries(["theaters"]);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to add theater!");
    },
  });

  return mutation;
};

export default useAddTheater;
