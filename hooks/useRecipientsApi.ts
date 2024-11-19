import { fetchApi } from "@/lib/fetch";
import {  RecipientEndPoints } from "@/server/apis";
import { showNotification } from "@/utility/toast-service";
import { useMutation, useQuery } from "@tanstack/react-query";


const useGetRecipients = () => {
    return useQuery({
      queryKey: ["recipients"],
      queryFn: () =>
        fetchApi<RecipientsResponse>({
          url: RecipientEndPoints.GET_RECIPIENTS,
        }),
      retry: false,
    });
  };

  const useUpdateRecipient = (id?: any) =>
    useMutation({
      mutationFn: (data: RecipientFormValues) =>
        fetchApi({
          method: "POST",
          url: RecipientEndPoints.UPDATE_RECIPIENT(id),
          data,
        }),
      retry: false,
    });

    const useCreateRecipient = () =>
      useMutation({
        mutationFn: (data: RecipientFormValues) =>
          fetchApi({
            method: "POST",
            url: RecipientEndPoints.CREATE_RECIPIENT,
            data,
          }),
        retry: false,
      });

      const useDeleteRecipient = () =>
        useMutation({
          mutationFn: (id?: any) =>
            fetchApi({
              method: "DELETE",
              url: RecipientEndPoints.DELETE_RECIPIENT(id),
            }),
          retry: false,
        });

        export {
          useGetRecipients,
          useCreateRecipient,
          useUpdateRecipient,
          useDeleteRecipient
        }