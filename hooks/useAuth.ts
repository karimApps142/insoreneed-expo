import { fetchApi } from "@/lib/fetch";
import { AuthEndpoints } from "@/server/apis";
import { AuthUser } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

const useSignIn = (data: AuthSignInData) => {
  return useMutation({
    mutationFn: () =>
      fetchApi({ method: "POST", url: AuthEndpoints.SIGN_IN, data }),
  });
};

const useSignUp = (data: AuthSignUpData) => {
  return useMutation({
    mutationFn: () =>
      fetchApi({ method: "POST", url: AuthEndpoints.SIGN_UP, data }),
  });
};

const useAuthenticateUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () =>
      fetchApi<AuthUser>({
        url: AuthEndpoints.GET_AUTHENTICATE_USER,
        displayErrors: false,
      }),
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
const useGetUser = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchApi({ url: AuthEndpoints.GET_USER(id) }),
    enabled: !!id,
  });
};

export { useSignIn, useSignUp, useAuthenticateUser, useGetUser };
