import client from "@/server/config";
import { showNotification } from "@/utility/toast-service";

interface ErrorResponse {
  title?: string;
  message: string;
}

interface FetchApiParams<T> {
  method?: "GET" | "POST" | "DELETE" | "PUT";
  url: string;
  data?: T;
  displayErrors?: boolean;
}

const fetchApi = async <T>({
  method = "GET",
  url,
  data,
  displayErrors = true,
}: FetchApiParams<T>): Promise<T> => {
  let response;

  switch (method) {
    case "POST":
      response = await client.post(url, data);
      break;
    case "DELETE":
      response = await client.delete(url);
      break;
    case "PUT":
      response = await client.put(url, data);
      break;
    case "GET":
    default:
      response = await client.get(url);
      break;
  }

  if (!response.ok) {
    const errorData: ErrorResponse = response.data as ErrorResponse;
    const message = errorData.message || "Error fetching data";
    if (displayErrors) {
      if (errorData?.title && errorData?.message) {
        showNotification("error", errorData.title, errorData.message);
      } else {
        showNotification("error", message);
      }
    }
    throw new Error(message);
  }
  
  return response.data as Promise<T>;
};

export { fetchApi };