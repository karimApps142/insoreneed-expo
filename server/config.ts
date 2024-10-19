import { create, ApisauceInstance } from "apisauce";
import { appTokenCache, Bearer_Token } from "./local-storage";

const baseURL: string = `${process.env.EXPO_PUBLIC_BASE_URL}/api`;

console.log(baseURL , '-->baseURL');

const apiClient: ApisauceInstance = create({ baseURL });

apiClient.addAsyncRequestTransform(async (request) => {
  const token: string | null = await appTokenCache.getToken(Bearer_Token);

  console.log(token, "===> Bearer");

  if (request.headers) {
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }

    if (request.data instanceof FormData) {
      request.headers["Content-Type"] = "multipart/form-data";
    }
  }
});

export default apiClient;
