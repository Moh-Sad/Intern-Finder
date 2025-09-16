import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, createUser } from "@/services/user.service";

export const useUsers = () => {
  return useQuery({ queryKey: ["users"], queryFn: getUsers });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
