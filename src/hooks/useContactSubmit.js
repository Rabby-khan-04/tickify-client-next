import axiosPublic from "@/lib/axios/axiosPublic";
import { useMutation } from "@tanstack/react-query";

const useContactSubmit = () => {
  const {
    mutate: submitContact,
    isPending,
    isError,
    isSuccess,
    reset,
  } = useMutation({
    mutationKey: ["contact-submit"],
    mutationFn: async (formData) => {
      const res = await axiosPublic.post("/contact/submit", formData);
      return res.data;
    },
  });

  return { submitContact, isPending, isError, isSuccess, reset };
};

export default useContactSubmit;
